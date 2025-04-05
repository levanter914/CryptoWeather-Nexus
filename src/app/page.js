"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import TrendingCoins from "@/components/trendingcoins";
import TrendingWeather from "@/components/trendingweather";
import TrendingNews from "@/components/trendingnews";

const Page = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor");

    const moveShapes = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      gsap.set(cursor, {
        x: mouseX,
        y: mouseY,
      });

      gsap.to(".shape", {
        x: mouseX,
        y: mouseY,
        stagger: -0.1,
        ease: "power2.out",
      });
    };

    document.body.addEventListener("mousemove", moveShapes);
    return () => document.body.removeEventListener("mousemove", moveShapes);
  }, []);

  return (
    <div className="spotlight-container cursor-none relative flex flex-col items-center justify-start min-h-screen overflow-x-hidden bg-white px-4 sm:px-6 md:px-8">
      {/* ✅ Custom Cursor */}
      <div className="cursor" id="cursor"></div>

      {/* Background Animated Shapes */}
      <div className="shapes fixed top-0 left-0 w-full h-full z-30 pointer-events-none">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>

        {/* Centered Welcome Text */}
        <div className="content z-40 absolute top-10"> {/* Decreased top value to move it higher */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center text-shadow-subtle leading-tight">
            Welcome to
            <br />
            CryptoWeather
            <br />
            Nexus
          </div>
        </div>
      </div>


      <div className="w-full border-y border-gray-300 py-3 mt-24 sm:mt-32 mb-12 bg-white z-20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-32 sm:gap-40 text-base sm:text-lg font-medium text-gray-600 px-4">
          <span>🌤️ Weather Alerts</span>
          <span>📈 Crypto Prices</span>
          <span>🗞️ Latest News</span>
          <span>⚠️ Real-Time Alerts</span>
        </div>
      </div>

      <div className="w-full max-w-7xl z-10 px-4 sm:px-0">
        <TrendingCoins />
      </div>

      <div className="w-full max-w-7xl z-10 pt-12 px-4 sm:px-0">
        <TrendingWeather />
      </div>

      <div className="w-full max-w-7xl z-10 pt-12 pb-32 px-4 sm:px-0">
        <TrendingNews />
      </div>
    </div>
  );
};

export default Page;
