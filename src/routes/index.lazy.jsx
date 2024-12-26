import React, { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import SearchFlight from '@/components/Home/searchFlight';
import Favorite from '@/components/Home/favorite';
import { Toaster } from 'react-hot-toast';
import { FaChevronCircleUp } from 'react-icons/fa';

export const Route = createLazyFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  const [searchData, setSearchData] = useState(null);

  return (
    <>
      <Toaster position="right-top" />
      <FaChevronCircleUp
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-10 right-10 w-[2rem] h-[2rem] z-50 cursor-pointer hover:text-[#A06ECE]"
      />
      <Navbar isAuth={true} searchBar={true} />
      <div className="flex flex-col justify-start w-screen items-center">
        {/* Hero */}
        <section className="mt-[3rem] w-full">
          <img src="/hero.svg" alt="hero" className="w-full object-cover" />
        </section>
        {/* Search Form */}
        <div className="flex justify-center w-full items-center shadow-sm bg-white z-20">
          <SearchFlight searchData={searchData} />
        </div>

        {/* <FavoriteDestination /> */}
        <section className="mt-10 w-full z-10">
          <Favorite setSearchData={setSearchData} />
        </section>
      </div>
    </>
  );
}

export default Homepage;
