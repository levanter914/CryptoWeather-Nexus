// app/api/coin/[id]/route.js

export async function GET(request, { params }) {
    const { id } = params;
  
    const res = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COINCAP_API_KEY}`, // or your CoinCap API key
      },
    });
  
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch coin details" }), {
        status: res.status,
      });
    }
  
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  