import React, { useEffect, useState } from 'react';
import CardFav from './CardFav';
import { getFavoriteDestination } from '@/Services/home/favoriteDestination';
import { Button } from '@radix-ui/themes';
import { IoSearch } from 'react-icons/io5';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Favorite = ({ setSearchData }) => {
  const [activeButton, setActiveButton] = useState('Semua');
  const [favorites, setFavorites] = useState([]);

  const destinationToContinentMap = {
    Semua: null,
    Asia: 'ASIA',
    Amerika: 'AMERICA',
    Australia: 'AUSTRALIA',
    Eropa: 'EUROPE',
    Afrika: 'AFRICA',
  };

  const destinations = Object.keys(destinationToContinentMap);

  const continent = destinationToContinentMap[activeButton];

  const {
    data: favData,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['favorites', continent],
    queryFn: ({ pageParam = {} }) => getFavoriteDestination(pageParam, continent),
    getNextPageParam: (lastPage) => {
      const { nextCursorId } = lastPage.meta;
      if (!nextCursorId) return null;
      return { nextCursorId };
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setFavorites(favData.pages.map((page) => page.data).flat());
    } else if (isError) {
      toast.error('Gagal memuat data destinasi favorit');
    }
  }, [isSuccess, favData]);

  const handleCardClick = (fav) => {
    const returnDate = new Date(fav.departureTimestamp);
    returnDate.setDate(returnDate.getDate() + 1);

    setSearchData({
      selectedDeptAirport: fav.departureAirport.id,
      selectedDestAirport: fav.destinationAirport.id,
      departureDate: new Date(fav.departureTimestamp).toLocaleString('en-CA').slice(0, 10),
      returnDate: new Date(returnDate).toLocaleString('en-CA').slice(0, 10),
      seatClass: fav.type,
      passengers: 1,
    });
  };

  return (
    <div className="pb-10 px-4 mx-auto max-w-screen-xl">
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
            }}
          >
            <IoSearch size="1.2rem" />
            {destination}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[30vh] my-5">
          <Loading text={'Mencari Penerbangan Favorit'} />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {favorites.map((fav, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Button
                key={index}
                className="w-full"
                onClick={() => {
                  handleCardClick(fav);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <CardFav fav={fav} />
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="text-center mt-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="text-md text-[#7126B5] font-semibold"
          >
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorite;
