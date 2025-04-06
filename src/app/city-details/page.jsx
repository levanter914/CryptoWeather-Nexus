"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";

const CityDetails = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const resultRef = useRef(null);
  const inputRef = useRef(null);

  const fetchWeatherData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
          key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
          q: city,
        },
      });
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  // Load animation based on time (is_day = 1 or 0)
  useEffect(() => {
    const loadAnimation = async () => {
      if (!weatherData) return;
      const isDay = weatherData.current.is_day;
      const animPath = isDay ? "/animations/day.json" : "/animations/night.json";
      const res = await fetch(animPath);
      const data = await res.json();
      setAnimationData(data);

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    loadAnimation();
  }, [weatherData]);

  // Autofocus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#caf0f8] px-6 pt-32 pb-12 flex flex-col items-center">
      <h1 className="text-5xl sm:text-6xl text-[#0077b6] font-extrabold mb-12 text-center">
        🌧️ City Weather Details 🌤️
      </h1>

      <form
        onSubmit={fetchWeatherData}
        className="flex flex-col sm:flex-row items-center gap-4 mb-8"
      >
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="nb-input default p-3 w-64 text-center text-lg bg-white shadow-md rounded border border-black"
        />
        <button type="submit" className="nb-button blue rounded px-6 py-2 text-lg">
          Search
        </button>
      </form>

      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {weatherData && (
        <div
          ref={resultRef}
          className="card mt-4 w-[26rem] text-left transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl bg-white rounded-lg overflow-hidden"
        >
          <a href="#" className="no-underline text-black">
            <div className="card-thumbnail flex justify-center items-center pt-4">
              {animationData && (
                <Lottie animationData={animationData} className="w-40 h-40" loop={true} />
              )}
            </div>
            <div className="card-content p-4">
              <div className="text-sm text-gray-500 mb-2">
                Last Updated: {weatherData.current.last_updated}
              </div>
              <p className="text-xl font-bold mb-2">
                🌆 {weatherData.location.name}, {weatherData.location.country}
              </p>
              <p className="mb-1">
                🌡 Temperature: <strong>{weatherData.current.temp_c}°C</strong>
              </p>
              <p className="mb-1">
                🌤 Condition: <strong>{weatherData.current.condition.text}</strong>
              </p>
              <p className="mt-2 text-blue-600">
                <strong>Stay prepared !!</strong>
              </p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default CityDetails;
