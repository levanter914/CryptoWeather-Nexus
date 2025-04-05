"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BsArrowUpRight } from "react-icons/bs";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

const TrendingCoins = () => {
  const [topCoins, setTopCoins] = useState([]);

  const fetchCoinData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      setTopCoins(res.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  const responsive = {
    0: { items: 1, stagePadding: { paddingLeft: 20, paddingRight: 20 } },
    768: { items: 2, stagePadding: { paddingLeft: 10, paddingRight: 10 } },
    1150: { items: 4, stagePadding: { paddingLeft: 40, paddingRight: 40 } },
  };

  return (
    <div className="relative top-6 w-full">
        <h2 className="text-2xl font-semibold mb-4 px-6">📈 Market Trends</h2>

        <div className="w-full">
            {topCoins.length > 0 ? (
            <AliceCarousel
                autoPlay
                autoPlayInterval={1050}
                animationDuration={800}
                mouseTracking
                infinite
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
            >
                {topCoins.map((coin, index) => (
                <div
                    key={coin.id + index}
                    className="card bg-[#ffffff] border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition duration-300 p-4 w-[95%] sm:w-[90%] md:w-72"
                >
                    <Link href={`/${coin.id}`} className="block">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={coin.image} alt={coin.symbol} className="w-12 h-12" />
                        <div>
                        <p className="uppercase font-bold text-lg">{coin.symbol}</p>
                        <p className="text-sm text-gray-500 capitalize">{coin.id}</p>
                        </div>
                    </div>

                    <div className="text-sm mb-2">
                        <p>
                        💵 <strong>Price:</strong> ${coin.current_price.toLocaleString()}
                        </p>
                        <p
                        className={`${
                            coin.price_change_percentage_24h > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        >
                        <strong>Change:</strong>{" "}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    </div>

                    <div className="text-sm mt-3">
                        <div className="flex justify-between mb-1">
                        <span className="font-semibold">24H High:</span>
                        <span className="text-green-600 flex items-center gap-1">
                            {coin.high_24h.toLocaleString()}
                            <FiTrendingUp />
                        </span>
                        </div>
                        <div className="flex justify-between">
                        <span className="font-semibold">24H Low:</span>
                        <span className="text-red-600 flex items-center gap-1">
                            {coin.low_24h.toLocaleString()}
                            <FiTrendingDown />
                        </span>
                        </div>
                    </div>
      
                    </Link>
                </div>
                ))}
            </AliceCarousel>
            ) : (
            <p className="text-center text-gray-500">⏳ Fetching top coins...</p>
            )}
        </div>
    </div>

  );
};

export default TrendingCoins;
