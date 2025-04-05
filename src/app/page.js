"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import TrendingCoins from "@/components/trendingcoins";
import TrendingWeather from "@/components/trendingweather";

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

    return () => {
      document.body.removeEventListener("mousemove", moveShapes);
    };
  }, []);

  return (
    <div className="spotlight-container relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background Animated Shapes */}
      <div className="shapes fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>

        {/* Centered Welcome Text */}
        <div className="content z-50">
          <div className="text-9xl md:text-8xl font-bold text-center text-shadow-subtle">
            Welcome to
            <br />
            CryptoWeather<br/>Nexus
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div className="cursor" id="cursor"></div>

      {/* Marquee Bar */}
      <div className="w-full border-y border-gray-200 py-4 mb-16 bg-white z-10">
        <div className="flex animate-marquee gap-16 text-lg font-medium text-gray-600">
          <span>🌤️ Weather Alerts</span>
          <span>📈 Crypto Prices</span>
          <span>🗞️ Latest News</span>
          <span>⚠️ Real-Time Alerts</span>
        </div>
      </div>


      {/* Coin and Weather Data */}
      <div className="w-full max-w-7xl z-10">
        <TrendingCoins />
      </div>

      <div className="w-full max-w-7xl z-10 pt-8">
        <TrendingWeather />
      </div>
    </div>
  );
};

export default Page;
