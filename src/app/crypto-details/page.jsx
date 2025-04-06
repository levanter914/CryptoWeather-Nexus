"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CryptoDetails = () => {
  const [crypto, setCrypto] = useState("");
  const [cryptoData, setCryptoData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCryptoData = async (e) => {
    e.preventDefault();
  
    // 💡 Immediately show loading and clear old data before fetch starts
    setLoading(true);
    setError("");
    setCryptoData(null);
    setHistoricalData([]);
  
    try {
      const listRes = await axios.get("/api/crypto/list");
      const coins = listRes.data;
  
      if (!Array.isArray(coins)) {
        throw new Error("Invalid response format");
      }
  
      const cleanCrypto = crypto.trim().toLowerCase();
  
      const match = coins.find(
        (c) =>
          c.id.toLowerCase() === cleanCrypto ||
          c.symbol.toLowerCase() === cleanCrypto ||
          c.name.toLowerCase() === cleanCrypto
      );
  
      if (!match) throw new Error("Crypto not found");
  
      const coinId = match.id;
  
      const marketRes = await axios.get(`/api/crypto/market?id=${coinId}`);
      const coinData = marketRes.data[0];
      setCryptoData(coinData);
  
      const historicalRes = await axios.get(`/api/crypto/chart?id=${coinId}`);
      setHistoricalData(historicalRes.data.prices || []);
    } catch (err) {
      setError(err.message || "Crypto not found. Please try again.");
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#caf0f8] px-6 pt-32 pb-12 flex flex-col items-center">
      <h1 className="text-5xl sm:text-6xl text-[#0077b6] font-extrabold mb-12 text-center">
        💰 Cryptocurrency Details 📈
      </h1>

      <form
        onSubmit={fetchCryptoData}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          placeholder="Enter cryptocurrency name"
          className="nb-input default p-2 w-72 text-center text-lg bg-white"
        />
        <button type="submit" className="nb-button default rounded px-6 py-2">
          Search
        </button>
      </form>

      {loading && <p className="text-blue-600 font-semibold mb-4">Loading...</p>}
      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

      {cryptoData && (
        <>
          {/* CARD 1: Main Info */}
          <div className="nb-card default bg-white w-full max-w-md p-6 rounded-xl shadow-lg text-left mb-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={cryptoData.image}
                alt={cryptoData.name}
                className="w-12 h-12"
              />
              <div>
                <h2 className="text-xl font-bold">
                  {cryptoData.name} ({cryptoData.symbol.toUpperCase()})
                </h2>
                <p className="text-sm text-gray-500">
                  Rank: #{cryptoData.market_cap_rank}
                </p>
              </div>
            </div>
            <p>
              🏦 Market Cap:{" "}
              <strong>${cryptoData.market_cap.toLocaleString()}</strong>
            </p>
            <p>
              📦 Volume:{" "}
              <strong>${cryptoData.total_volume.toLocaleString()}</strong>
            </p>
            <p>
              🪙 Supply:{" "}
              <strong>{cryptoData.circulating_supply.toLocaleString()}</strong>
            </p>
          </div>

          {/* CARD 2: ATH and Price */}
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-4xl mb-6">
            <div className="nb-card default bg-white flex-1 p-6 rounded-xl shadow-lg text-left">
              <h3 className="text-lg font-semibold mb-2">
                📈 All Time High (ATH)
              </h3>
              <p>
                🔝 ATH Price:{" "}
                <strong>${cryptoData.ath.toLocaleString()}</strong>
              </p>
              <p>
                📉 ATH Change:{" "}
                <span
                  className={
                    cryptoData.ath_change_percentage >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {cryptoData.ath_change_percentage.toFixed(2)}%
                </span>
              </p>
            </div>

            <div className="nb-card default bg-white flex-1 p-6 rounded-xl shadow-lg text-left">
              <h3 className="text-lg font-semibold mb-2">💵 Current Price</h3>
              <p>
                Price:{" "}
                <strong>${cryptoData.current_price.toLocaleString()}</strong>
              </p>
              <p>
                24h High:{" "}
                <strong>${cryptoData.high_24h.toLocaleString()}</strong>
              </p>
              <p>
                24h Low:{" "}
                <strong>${cryptoData.low_24h.toLocaleString()}</strong>
              </p>
              <p>
                Change:{" "}
                <span
                  className={
                    cryptoData.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {cryptoData.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
            </div>
          </div>

          {/* CARD 3: Graph */}
          {Array.isArray(historicalData) && historicalData.length > 0 && (
            <div className="nb-card default bg-white w-full max-w-4xl p-6 rounded-xl shadow-lg text-left">
              <h3 className="text-lg font-semibold mb-4">
                📊 Price Trend (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={historicalData
                    .filter(([_, price]) => typeof price === "number")
                    .map(([timestamp, price]) => ({
                      date: new Date(timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      }),
                      price: price.toFixed(2),
                    }))}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#944b99"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CryptoDetails;
