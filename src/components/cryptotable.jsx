import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineStar, AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { favouritesActions } from '@/ReduxStore/FavouritesSlice';
import { BiRupee } from 'react-icons/bi';
import Link from 'next/link';
import axios from 'axios';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [showDrawer, setShowDrawer] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const reduxFavouritesARR = useSelector((state) => state.favourites.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, [currency]);

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(''), 1500);
  };

  const addToFavouritesHandler = (coin) => {
    const alreadyExists = reduxFavouritesARR.some((item) => item.id === coin.id);
    if (alreadyExists) {
      showToast('Already in favourites!');
      return;
    }
  
    dispatch(favouritesActions.addToFavourites(coin));
    showToast('Added to favourites!');
  };
  

  const removeFromFavHandler = (coin) => {
    dispatch(favouritesActions.removeFromFavourites(coin));
    showToast('Removed from favourites');
  };

  const filteredData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 relative">
      <h2 className="text-xl sm:text-2xl font-semibold mb-8 px-4 sm:px-6">
        💡 Cryptocurrency Table
      </h2>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-300">
          {toastMsg}
        </div>
      )}

      {/* Search + Favourites */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <FaSearch className="text-gray-500" />
        </div>
        <button
          onClick={() => setShowDrawer(true)}
          className="bg-yellow-400 px-3 py-1 rounded text-sm"
        >
          View Favourites
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {paginatedData.length === 0 ? (
          <p className="text-center">No Results Found</p>
        ) : (
          <table className="table-auto w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Coin</th>
                <th className="p-2 text-left">Current Price</th>
                <th className="p-2 text-left">Total Volume</th>
                <th className="p-2 text-left">Market Cap</th>
                <th className="p-2 text-left">24h Change</th>
                <th className="p-2 text-left">Favorites</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((coin) => (
                <tr key={coin.id} className="border-t">
                  <td className="p-2">
                    <Link href={`/${coin.id}`} className="flex items-center gap-2">
                      <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                      {coin.name}
                    </Link>
                  </td>
                  <td className="p-2">
                    {currency === 'usd' ? '$' : <BiRupee />} {coin.current_price.toLocaleString()}
                  </td>
                  <td className="p-2">{coin.total_volume.toLocaleString()}</td>
                  <td className="p-2">{coin.market_cap.toLocaleString()}</td>
                  <td className="p-2">{coin.price_change_percentage_24h.toFixed(2)}%</td>
                  <td className="p-2 flex gap-2">
                    <AiOutlineStar
                      className="cursor-pointer text-yellow-400  text-2xl"
                      onClick={() => addToFavouritesHandler(coin)}
                    />
                    <AiFillDelete
                      className="cursor-pointer text-red-500 text-2xl"
                      onClick={() => removeFromFavHandler(coin)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Favourites Drawer (Slide In Panel) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 transition-transform duration-300 ${
          showDrawer ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Favourites</h2>
          <button
            className="text-sm text-gray-600"
            onClick={() => setShowDrawer(false)}
          >
            Close
          </button>
        </div>
        {reduxFavouritesARR.length === 0 ? (
          <p>No favourites yet</p>
        ) : (
          reduxFavouritesARR.map((coin) => (
            <div key={coin.id} className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <p>{coin.name}</p>
              </div>
              <AiFillDelete
                className="cursor-pointer text-red-500 text-2xl"
                onClick={() => removeFromFavHandler(coin)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CryptoTable;
