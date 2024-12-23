import React, { useState, useEffect } from 'react';
import CardFav from './CardFav';
import { getFavoriteDestination } from '@/Services/home/favoriteDestination';
import toast from 'react-hot-toast';
import { Button } from '@radix-ui/themes';
import { IoSearch } from 'react-icons/io5';
import ReactLoading from 'react-loading';

const Favorite = ({ setSearchData }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleFavorites, setVisibleFavorites] = useState(8);
  const [activeButton, setActiveButton] = useState('Semua');

  const destinationToContinentMap = {
    Semua: null,
    Asia: 'ASIA',
    Amerika: 'AMERICA',
    Australia: 'AUSTRALIA',
    Eropa: 'EUROPE',
    Afrika: 'AFRICA',
  };

  const destinations = Object.keys(destinationToContinentMap);

  const fetchFavorites = async (destination) => {
    try {
      setLoading(true);
      const continentParam = destinationToContinentMap[destination];
      const response = await getFavoriteDestination(continentParam);
      setFavorites(response);
    } catch (err) {
      toast.error(err.message || 'Gagal memuat data destinasi favorit');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites(activeButton);
  }, [activeButton]);

  const handleCardClick = (fav) => {
    setSearchData({
      selectedDeptAirport: fav.departureAirport.id,
      selectedDestAirport: fav.destinationAirport.id,
      departureDate: new Date(fav.departureTimestamp).toISOString().split('T')[0],
      returnDate: new Date(fav.arrivalTimestamp).toISOString().split('T')[0],
      seatClass: fav.type,
      passengers: 1,
    });
  };

  const handleLoadMore = () => {
    setVisibleFavorites((prev) => prev + 4);
  };

  return (
    <div className="pb-24 px-4 mx-auto max-w-screen-xl">
      <h1 className="text-xl font-bold mb-4">Destinasi Favorit</h1>
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {destinations.map((destination) => (
          <Button
            key={destination}
            className={`rounded-xl py-3 px-6 flex items-center gap-2 ${
              activeButton === destination ? 'bg-[#7126B5] text-white' : 'bg-purple-200 text-black'
            }`}
            onClick={() => {
              setActiveButton(destination);
              setFavorites([]);
              setVisibleFavorites(4);
            }}
          >
            <IoSearch size="1.2rem" />
            {destination}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-start w-full my-5">
          <ReactLoading type="spin" color="#7126B5" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center sm:justify-start items-center">
          {favorites.slice(0, visibleFavorites).map((fav, index) => (
            <Button
              key={index}
              onClick={() => {
                handleCardClick(fav);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex justify-center sm:justify-start"
            >
              <CardFav fav={fav} />
            </Button>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        {loading ? (
          <span>Loading more...</span>
        ) : visibleFavorites < favorites.length ? (
          <button
            className="mt-1 px-4 py-2 rounded-lg text-md pb-[3vh] text-[#7126B5] font-semibold animate-pulse"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        ) : (
          <p className="mt-1 px-4 py-2 rounded-lg text-md pb-[3vh] text-[#7126B5] font-semibold">
            Nothing more to load
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
