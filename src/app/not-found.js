"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fefefe] text-black text-center p-6">
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-6 text-shadow-subtle"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚧 Coming Soon...
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        This page is under construction.
      </motion.h2>

      <motion.p
        className="text-md md:text-lg text-gray-600 max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Sorry, the page you’re looking for doesn’t exist yet. Our engineers are probably mining coins and sipping coffee ☕.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/"
          className="px-6 py-3 bg-yellow-300 border-2 border-black text-black font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
