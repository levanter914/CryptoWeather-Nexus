// /pages/crypto-details.js
"use client";

import React, { useState } from "react";
import axios from "axios";

const CryptoDetails = () => {
  const [crypto, setCrypto] = useState("");
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState("");

  const fetchCryptoData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      });
      const filteredData = response.data.find((coin) => coin.id.toLowerCase() === crypto.toLowerCase());
      if (filteredData) {
        setCryptoData(filteredData);
        setError("");
      } else {
        throw new Error("Crypto not found.");
      }
    } catch (err) {
      setError("Crypto not found. Please try again.");
      setCryptoData(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crypto Details</h1>
      <form onSubmit={fetchCryptoData} className="mb-4">
        <input
          type="text"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          placeholder="Enter cryptocurrency name"
          className="border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 ml-2">
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {cryptoData && (
        <div className="crypto-info">
          <h2 className="text-xl font-bold">{cryptoData.name}</h2>
          <p>Price: ${cryptoData.current_price.toLocaleString()}</p>
          <p>Market Cap: ${cryptoData.market_cap.toLocaleString()}</p>
          <p>24h Change: {cryptoData.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default CryptoDetails;
