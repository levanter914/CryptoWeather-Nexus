"use client";
import React, { useEffect, useState } from "react";

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
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      } bg-transparent`}
    >
      <div className="flex justify-center items-center h-20 backdrop-blur-md">
        <div className="flex space-x-4">
          <button className="nb-button blue rounded">Dashboard</button>
          <button className="nb-button default rounded">Weather Details</button>
          <button className="nb-button blue rounded">Crypto News</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
