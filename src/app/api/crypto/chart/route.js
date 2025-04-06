export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get("id");
  
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }
  