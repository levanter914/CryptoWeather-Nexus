"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <motion.h1
        className="text-6xl font-bold text-yellow-400 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Coming Soon..
      </motion.h1>
      <motion.h2
        className="text-3xl font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Page Not Found
      </motion.h2>
      <motion.p
        className="text-lg text-gray-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Sorry, the page you are looking for does not exist.
      </motion.p>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          href="/"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}