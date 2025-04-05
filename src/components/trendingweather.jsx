"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const cities = [
  "New York",
  "London",
  "Tokyo",
  "New Delhi",
  "Sydney",
  "Paris",
  "Barcelona",
  "Rome",
  "Berlin",
  "Vienna",
];

const TrendingWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeather = async () => {
    try {
      const results = await Promise.all(
        cities.map((city) =>
          axios.get("https://api.weatherapi.com/v1/current.json", {
            params: {
              key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
              q: city,
            },
          })
        )
      );
      setWeatherData(results.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const responsive = {
    0: { items: 1, stagePadding: { paddingLeft: 20, paddingRight: 20 } },
    640: { items: 1.2 },
    768: { items: 2 },
    1024: { items: 3 },
    1280: { items: 4 },
  };

  return (
    <div className="relative top-2 w-full"> {/* Reduced top margin */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">⛅ Trending Weather</h2> {/* Reduced bottom margin */}

      {weatherData.length > 0 ? (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlay
          autoPlayInterval={1800}
          animationDuration={800}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
        >
          {weatherData.map((city, idx) => (
            <div
              key={city.location.name + idx}
              className="card bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition duration-300 p-4 mx-2"
            >
              <div className="flex justify-between gap-4 items-center ">
                <h3 className="font-bold text-lg sm:text-xl">{city.location.name}</h3>
                <img
                  src={`https:${city.current.condition.icon}`}
                  alt="weather icon"
                  className="w-12 h-12"
                />
              </div>

              <div className="text-sm sm:text-base space-y-1">
                <p>
                  🌡️ <strong>Temp:</strong> {city.current.temp_c}°C
                </p>
                <p>
                  💧 <strong>Humidity:</strong> {city.current.humidity}%
                </p>
                <p>
                  💨 <strong>Wind:</strong> {city.current.wind_kph} km/h
                </p>
                <p className="capitalize mt-1">
                  ☁️ <strong>{city.current.condition.text}</strong>
                </p>
              </div>

              <a
                href={`https://www.weatherapi.com/weather/q/${city.location.name.replace(" ", "-")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-right text-blue-600 underline font-semibold text-sm"
              >
                Learn More →
              </a>
            </div>
          ))}
        </AliceCarousel>
      ) : (
        <p className="text-center text-gray-500">⏳ Fetching weather data...</p>
      )}
    </div>
  );
};

export default TrendingWeather;
