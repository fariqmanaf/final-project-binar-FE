import React, { useEffect, useState } from 'react';
import CardFav from './CardFav';
import { getFavoriteDestination } from '@/Services/home/favoriteDestination';
import toast from 'react-hot-toast';
import { Button } from '@radix-ui/themes';
import { IoSearch } from 'react-icons/io5';
import ReactLoading from 'react-loading';

const Favorite = ({ setSearchData }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [activeButton, setActiveButton] = useState('Semua');

  // Mapping destinations ke validContinents
  const destinationToContinentMap = {
    Semua: null,
    Asia: 'ASIA',
    Amerika: 'AMERICA',
    Australia: 'AUSTRALIA',
    Eropa: 'EUROPE',
    Afrika: 'AFRICA',
  };

  const destinations = Object.keys(destinationToContinentMap);

  // Fungsi untuk fetch data favorit
  const fetchFavorites = async (destination, cursor = null) => {
    try {
      setLoading(true);

      const continentParam = destinationToContinentMap[destination];
      const response = await getFavoriteDestination(continentParam, cursor);

      // Update data favorites dan nextCursor
      setFavorites((prevFavorites) => (cursor ? [...prevFavorites, ...response] : response));
      setNextCursor(response.nextCursor);
    } catch (err) {
      toast.error(err.message || 'Gagal memuat data destinasi favorit');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data saat tombol dipilih
  useEffect(() => {
    fetchFavorites(activeButton);
  }, [activeButton]);

  // Fungsi untuk menangani tombol "Load More"
  const handleLoadMore = () => {
    if (nextCursor) {
      fetchFavorites(activeButton, nextCursor);
    }
  };

  const handleCardClick = (fav) => {
    setSearchData({
      selectedDeptAirport: fav.departureAirport.name,
      selectedDestAirport: fav.destinationAirport.name,
      departureDate: new Date(fav.departureTimestamp).toISOString().split('T')[0],
      returnDate: new Date(fav.arrivalTimestamp).toISOString().split('T')[0],
      seatClass: fav.type,
      passengers: 1, // Assuming 1 passenger for simplicity
    });
  };

  return (
    <div className="pb-24">
      <h1 className="text-xl font-bold">Destinasi Favorit</h1>
      <div className="flex gap-4 mt-4">
        {destinations.map((destination) => (
          <Button
            key={destination}
            className={`rounded-xl py-3 px-6 flex items-center gap-2 ${
              activeButton === destination ? 'bg-[#7126B5] text-white' : 'bg-purple-200 text-black'
            }`}
            onClick={() => {
              setActiveButton(destination);
              if (activeButton !== destination) {
                setFavorites([]); // Reset favorites agar tidak tercampur
              }
              setNextCursor(null); // Reset nextCursor
            }}
          >
            <IoSearch size="1.2rem" />
            {destination}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-start w-full my-5">
          <ReactLoading type="spin" color="#7126B5" />
        </div>
      )}
      <div className="flex flex-wrap gap-5 mt-4">
        {favorites && favorites.length > 0
          ? favorites.map((fav, index) => (
              <div key={index} onClick={() => handleCardClick(fav)}>
                <CardFav fav={fav} />
              </div>
            ))
          : !loading && <p>No favorite destinations found.</p>}
      </div>

      {nextCursor && !loading && (
        <button className="mt-4 px-4 py-2 bg-[#7126B5] text-white rounded-lg" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Favorite;
