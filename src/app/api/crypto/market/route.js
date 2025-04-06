export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get("id");
  
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }
  