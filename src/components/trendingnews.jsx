"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Link from "next/link";

const TrendingNews = () => {
  const [articles, setArticles] = useState([]);

  const fetchCryptoNews = async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY; 
    try {
      const response = await axios.get("https://newsdata.io/api/1/latest", {
        headers: {
          "X-ACCESS-KEY": apiKey, 
        },
        params: {
          q: "crypto",
          language: "en",
        },
      });

      if (response.data.status === "success") {
        setArticles(response.data.results);
      } else {
        console.error("Error fetching news:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching crypto news:", error);
    }
  };

  useEffect(() => {
    fetchCryptoNews();
  }, []);

  const responsive = {
    0: { items: 1 },
    640: { items: 2 },
    1024: { items: 3 },
    1280: { items: 4 },
  };

  return (
    <div className="relative top-2 w-full"> {/* Reduced top margin */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 px-4 sm:px-6"> 📰 Latest Crypto News </h2>

      <div className="w-full">
        {articles.length > 0 ? (
          <AliceCarousel
            autoPlay
            autoPlayInterval={3000}
            animationDuration={800}
            mouseTracking
            infinite
            disableButtonsControls
            disableDotsControls
            responsive={responsive}
          >
            {articles.map((article) => (
              <div
                key={article.article_id}
                className="card bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition duration-300 p-4 mx-2 flex flex-col justify-between h-72"
              >
                <Link href={article.link} target="_blank" rel="noopener noreferrer" className="flex-1 gap-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm mb-2 line-clamp-1">
                    Published on: {new Date(article.pubDate).toLocaleString()}
                  </p>
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-32 object-cover mb-2 rounded-lg"
                    />
                  )}
                  <p className="text-sm text-gray-500 line-clamp-3">{article.description || "No description available."}</p>
                </Link>
              </div>
            ))}
          </AliceCarousel>
        ) : (
          <p className="text-center text-gray-500">⏳ Fetching latest news...</p>
        )}
      </div>
    </div>
  );
};

export default TrendingNews;
