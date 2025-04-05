"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHideHeader(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      } bg-transparent`} // Changed bg-tranparent to bg-transparent
    >
      <div className="flex justify-center items-center px-4 py-3 sm:py-4">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          <Link href="/" passHref>
            <button className="nb-button blue rounded px-4 py-2 text-sm sm:text-base">
              Dashboard
            </button>
          </Link>
          <Link href="/city-details" passHref>
            <button className="nb-button default rounded px-4 py-2 text-sm sm:text-base">
              Weather
            </button>
          </Link>
          <Link href="/crypto-details" passHref>
            <button className="nb-button blue rounded px-4 py-2 text-sm sm:text-base">
              Cryptocurrency
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
