import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { IoHome } from "react-icons/io5";
import { FaGithub, FaReddit } from "react-icons/fa";
import { Link } from "react-router-dom"; // or "next/link" if using Next.js

const CoinDetailHero = ({ cryptoName }) => {
  const [coinDetail, setCoinDetail] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);

  const fetchCoinData = async () => {
    try {
      const [coinRes, trendingRes] = await Promise.all([
        fetch(`https://api.coincap.io/v2/assets/${cryptoName}`),
        fetch(`https://api.coincap.io/v2/assets?limit=10`)
      ]);

      const coinJson = await coinRes.json();
      const trendingJson = await trendingRes.json();

      setCoinDetail(coinJson.data);
      setTrendingCoins(trendingJson.data);
    } catch (err) {
      console.error("CoinCap API fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [cryptoName]);

  if (!coinDetail) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex gap-2 text-sm text-gray-500">
          <li>Cryptocurrencies</li>
          <li>/</li>
          <li>Coins</li>
          <li>/</li>
          <li className="capitalize text-black">{cryptoName}</li>
          <li>/</li>
          <li>
            <Link to="/" className="hover:underline flex items-center gap-1">
              <IoHome />
              Home
            </Link>
          </li>
        </ol>
      </nav>

      {/* Coin Header */}
      <div className="flex flex-wrap items-center gap-10 justify-evenly">
        <div className="flex gap-6 items-center">
          <img
            src={`https://assets.coincap.io/assets/icons/${coinDetail.symbol.toLowerCase()}@2x.png`}
            alt={coinDetail.name}
            className="w-24 h-24 rounded-full bg-white shadow-md"
            onError={(e) => (e.target.src = "/placeholder.png")}
          />
          <div className="text-center">
            <p className="text-2xl font-bold uppercase">
              {coinDetail.name}{" "}
              <span className="text-sm text-gray-400">#{coinDetail.rank}</span>
            </p>
            <p className="text-xl font-semibold text-gray-700">
              ${parseFloat(coinDetail.priceUsd).toFixed(2)}
              <span
                className={`ml-2 text-sm ${
                  parseFloat(coinDetail.changePercent24Hr) < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {parseFloat(coinDetail.changePercent24Hr).toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* Trending Coins Carousel */}
        {trendingCoins.length > 0 && (
          <div className="w-full max-w-3xl mt-8 md:mt-0">
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              loop={true}
              modules={[Autoplay]}
              autoplay={{ delay: 1000 }}
              breakpoints={{
                300: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
            >
              {trendingCoins.map((coin, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center px-2">
                    <img
                      src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                      alt={coin.name}
                      className="w-12 h-12 mx-auto rounded-full bg-white shadow"
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                    <p className="text-xs mt-1 font-semibold">{coin.name}</p>
                    <p className="text-xs text-gray-500 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* Tags and Links - Not available in CoinCap */}
      <div className="flex gap-4 mt-6">
        <p className="text-gray-500 text-sm italic">
          Tags and social links not available via CoinCap API.
        </p>
      </div>

      {/* Stats Section */}
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-gray-500 text-sm">Market Cap</p>
          <p className="text-xl font-bold">
            ${parseFloat(coinDetail.marketCapUsd).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-gray-500 text-sm">Circulating Supply</p>
          <p className="text-xl font-bold">
            {parseFloat(coinDetail.supply).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-gray-500 text-sm">24h Volume</p>
          <p className="text-xl font-bold">
            ${parseFloat(coinDetail.volumeUsd24Hr).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <p className="text-gray-500 text-sm">Rank</p>
          <p className="text-xl font-bold">#{coinDetail.rank}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailHero;
