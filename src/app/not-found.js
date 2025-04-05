"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fefefe] text-black text-center px-4 py-10">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-shadow-subtle leading-tight"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚧 Coming Soon...
      </motion.h1>

      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        This page is under construction.
      </motion.h2>

      <motion.p
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg md:max-w-xl mb-6 sm:mb-8 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Sorry, the page you’re looking for doesn’t exist yet. Our engineers are probably mining coins and sipping coffee ☕.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/"
          className="inline-block px-5 py-3 sm:px-6 sm:py-3 bg-yellow-300 border-2 border-black text-sm sm:text-base font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
