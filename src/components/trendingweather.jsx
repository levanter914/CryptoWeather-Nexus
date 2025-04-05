"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const cities = ["New York", "London", "Tokyo", "Delhi", "Sydney","Paris","Barcelona","Rome","Berlin","Vienna"];

const TrendingWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeather = async () => {
    try {
      const results = await Promise.all(
        cities.map(city =>
          axios.get("https://api.weatherapi.com/v1/current.json", {
            params: {
              key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
              q: city,
            },
          })
        )
      );
      setWeatherData(results.map(res => res.data));
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const responsive = {
    0: { items: 1 },
    768: { items: 2 },
    1150: { items: 3 },
  };

  return (
    <div className="relative top-6 px-4">
      <h2 className="text-2xl font-semibold mb-4 ml-4">🌦 Trending Weather</h2>
      {weatherData.length > 0 ? (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlay
          autoPlayInterval={1500}
          animationDuration={800}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
        >
          {weatherData.map((city, idx) => (
            <div
              key={city.location.name + idx}
              className="card bg-[#fffff] border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition duration-300 p-4 w-72 mx-auto"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">{city.location.name}</h3>
                <img
                  src={`https:${city.current.condition.icon}`}
                  alt="weather icon"
                  className="w-12 h-12"
                />
              </div>
              <p className="text-sm">
                🌡️ <strong>Temp:</strong> {city.current.temp_c}°C
              </p>
              <p className="text-sm">
                💧 <strong>Humidity:</strong> {city.current.humidity}%
              </p>
              <p className="text-sm">
                💨 <strong>Wind:</strong> {city.current.wind_kph} km/h
              </p>
              <p className="text-sm capitalize mt-2">
                ☁️ <strong>{city.current.condition.text}</strong>
              </p>
              <a
                href={`https://www.weatherapi.com/weather/q/${city.location.name.replace(
                  " ",
                  "-"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-blue-600 underline font-semibold text-right"
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
