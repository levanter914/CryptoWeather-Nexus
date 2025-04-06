// app/api/crypto/lookup/route.js
export async function GET(request) {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }
  