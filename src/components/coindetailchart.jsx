import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Link from 'next/link';

const CoinDetailChart = ({ cryptoName }) => {
  const chartRef = useRef(null);
  const [chartDataState, setChartDataState] = useState([]);
  const [coinDetails, setCoinDetails] = useState(null);

  const fetchDataHandler = async () => {
    try {
      // Fetch price chart data (last 10 days)
      const chartRes = await fetch(`https://api.coincap.io/v2/assets/${cryptoName}/history?interval=d1`);
      const chartJson = await chartRes.json();
      const prices = chartJson.data;
      setChartDataState(prices);

      // Destroy existing chart instance
      if (chartRef.current?.chart) {
        chartRef.current.chart.destroy();
      }

      // Format data for chart
      const labels = prices.map(p => new Date(p.date).toLocaleDateString());
      const dataPoints = prices.map(p => parseFloat(p.priceUsd));

      const ctx = chartRef.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Price (USD)',
            data: dataPoints,
            borderColor: 'red',
            fill: false,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { display: false },
            y: { display: true, grid: { display: false } }
          },
          elements: {
            point: {
              radius: 0,
              backgroundColor: 'red',
              borderWidth: 0
            }
          }
        }
      });

      chartRef.current.chart = chartInstance;
    } catch (error) {
      console.error('Error fetching chart:', error);
    }
  };

  const fetchCoinDetails = async () => {
    try {
      const res = await fetch(`https://api.coincap.io/v2/assets/${cryptoName}`);
      const json = await res.json();
      setCoinDetails(json.data);
    } catch (error) {
      console.error('Error fetching coin details:', error);
    }
  };

  useEffect(() => {
    fetchDataHandler();
    fetchCoinDetails();
  }, [cryptoName]);

  if (!coinDetails) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className='flex justify-evenly flex-wrap items-center'>
      <div className='w-full h-96'>
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="statsCardHold boxsh2 rounded p-6 bg-white w-full md:w-1/2 max-w-md shadow-md mt-10">
        <div className="flex flex-col gap-4 items-center">
          <div className='flex items-center gap-3 mb-5'>
            <img
              src={`https://assets.coincap.io/assets/icons/${coinDetails.symbol.toLowerCase()}@2x.png`}
              alt={`${coinDetails.name} logo`}
              className='w-10 h-10 bg-white rounded-full'
            />
            <h2 className="text-lg font-semibold">{coinDetails.name} Statistics</h2>
          </div>

          <Stat label="Price" value={`$${parseFloat(coinDetails.priceUsd).toLocaleString()}`} />
          <Stat label="Market Cap" value={`$${parseFloat(coinDetails.marketCapUsd).toLocaleString()}`} />
          <Stat label="Volume (24h)" value={`$${parseFloat(coinDetails.volumeUsd24Hr).toLocaleString()}`} />
          <Stat label="Change (24h)" value={`${parseFloat(coinDetails.changePercent24Hr).toFixed(2)}%`} color={parseFloat(coinDetails.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500'} />
          <Stat label="Rank" value={`#${coinDetails.rank}`} />
          <Stat label="Supply" value={`${Number(coinDetails.supply).toLocaleString()} ${coinDetails.symbol.toUpperCase()}`} />

          <Link
            href={`https://coincap.io/assets/${cryptoName}`}
            target="_blank"
            className="mt-4 text-blue-600 hover:underline"
          >
            View on CoinCap →
          </Link>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, color = 'text-gray-700' }) => (
  <>
    <div className='bg-gray-100 h-px w-full'></div>
    <div className='flex justify-between w-full px-2 text-sm'>
      <span className='text-gray-400'>{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  </>
);

export default CoinDetailChart;
