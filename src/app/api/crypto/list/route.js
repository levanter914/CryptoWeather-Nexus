export async function GET() {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/list", {
        headers: {
          "User-Agent": "Mozilla/5.0", // Required by some APIs
        },
      });
  
      if (!res.ok) {
        console.error("❌ CoinGecko error:", res.status, res.statusText);
        return new Response(
          JSON.stringify({ error: "Failed to fetch CoinGecko list" }),
          { status: res.status }
        );
      }
  
      const data = await res.json();
  
      if (!Array.isArray(data)) {
        console.error("❌ Invalid response format");
        return new Response(JSON.stringify({ error: "Invalid response format" }), {
          status: 500,
        });
      }
  
      console.log("✅ Coin list fetched:", data.length);
  
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("❌ Unexpected error in /api/crypto/list:", error.message);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
  