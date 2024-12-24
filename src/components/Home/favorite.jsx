import React, { useState } from 'react';
import CardFav from './CardFav';
import { getFavoriteDestination } from '@/Services/home/favoriteDestination';
import toast from 'react-hot-toast';
import { Button } from '@radix-ui/themes';
import { IoSearch } from 'react-icons/io5';
import ReactLoading from 'react-loading';
import { useInfiniteQuery } from '@tanstack/react-query';

const Favorite = ({ setSearchData }) => {
  const [activeButton, setActiveButton] = useState('Semua');
  const [showAll, setShowAll] = useState(false);

  const destinationToContinentMap = {
    Semua: null,
    Asia: 'ASIA',
    Amerika: 'AMERICA',
    Australia: 'AUSTRALIA',
    Eropa: 'EUROPE',
    Afrika: 'AFRICA',
  };

  const destinations = Object.keys(destinationToContinentMap);

  const fetchFavorites = async ({ pageParam = 1 }) => {
    const continentParam = destinationToContinentMap[activeButton];
    const response = await getFavoriteDestination(continentParam, pageParam);
    if (!response) {
      throw new Error('Data not found');
    }
    return {
      favorites: response,
      nextPage: pageParam + 1,
      isLast: response.length === 0,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['favorites', activeButton],
    queryFn: fetchFavorites,
    getNextPageParam: (lastPage) => {
      if (lastPage && !lastPage.isLast) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });

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

  const initialFavorites = data?.pages[0]?.favorites.slice(0, 8) || [];
  const allFavorites = Array.from(new Set(data?.pages.flatMap((page) => page.favorites.map((fav) => fav.id)))).map(
    (id) => {
      return data.pages.flatMap((page) => page.favorites).find((fav) => fav.id === id);
    }
  );

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
              setShowAll(false);
            }}
          >
            <IoSearch size="1.2rem" />
            {destination}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-start w-full my-5">
          <ReactLoading type="spin" color="#7126B5" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center sm:justify-start items-center">
          {(showAll ? allFavorites : initialFavorites).map((fav, index) => (
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
        {isFetchingNextPage ? (
          <span className="mt-1 px-4 py-2 rounded-lg text-md pb-[3vh] text-[#7126B5] font-semibold">
            Loading more...
          </span>
        ) : hasNextPage && !showAll ? (
          <button
            className="mt-1 px-4 py-2 rounded-lg text-md pb-[3vh] text-[#7126B5] font-semibold animate-pulse"
            onClick={() => {
              fetchNextPage();
              setShowAll(true);
            }}
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
