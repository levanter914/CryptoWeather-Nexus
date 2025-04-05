"use client";
import React from 'react';
import TrendingCoins from "@/components/trendingcoins"
import TrendingWeather from '@/components/trendingweather';


const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-4xl md:text-6xl font-bold mb-50 text-center text-center text-shadow-subtle mt-45">
        Welcome to<br />CryptoWeather Nexus
      </h1>

      <div className="w-full overflow-hidden border-y border-gray-200 py-4 mb-16 bg-white">
        <div className="inline-block whitespace-nowrap animate-marquee space-x-16 text-lg font-medium text-gray-600">
          <span>🌤️ Weather Alerts</span>
          <span>📈 Cryto Prices</span>
          <span>🗞️ Latest News</span>
          <span>⚠️ Real-Time Alerts</span>
        </div>

        
      </div>
      <div className="w-full max-w-7xl">
        <TrendingCoins />
      </div>

      <div className="w-full max-w-7xl">
        <TrendingWeather />
      </div>
    </div>
  );
};

export default Page;
