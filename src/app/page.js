"use client";
import React from 'react';


const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-4xl md:text-6xl font-bold mb-40 text-center text-center text-shadow-subtle mt-35">
        Welcome to<br />CryptoWeather Nexus
      </h1>

      <div className="marquee w-full overflow-hidden whitespace-nowrap border-t border-b py-4">
        <div className="marquee-content inline-block animate-marquee space-x-16 text-xl">
          <span>🌤️ Weather Alerts</span>
          <span>📈 Cryto Prices</span>
          <span>🗞️ Latest News</span>
          <span>⚠️ Real-Time Alerts</span>
          
        </div>
      </div>
    </div>
  );
};

export default Page;
