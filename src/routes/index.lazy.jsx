import React, { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/slices/auth';
import Navbar from '@/components/Navbar';
import SearchFlight from '@/components/Home/searchFlight';
import Favorite from '@/components/Home/favorite';

export const Route = createLazyFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  const [searchData, setSearchData] = useState({
    selectedDeptAirport: '',
    selectedDestAirport: '',
    departureDate: '',
    returnDate: '',
    seatClass: '',
    passengers: '',
  });

  return (
    <>
      <Navbar isAuth={true} searchBar={true} />
      <div className="flex flex-col justify-start w-screen items-center">
        {/* Hero */}
        <section className="mt-[3rem] w-full">
          <img src="/hero.svg" alt="hero" className="w-full object-cover" />
        </section>
        {/* Search Form */}
        <div className="flex justify-center w-full items-center shadow-sm bg-white" style={{ zIndex: '2' }}>
          <SearchFlight searchData={searchData} setSearchData={setSearchData} />
        </div>

        {/* <FavoriteDestination /> */}
        <section className="mt-10 w-full" style={{ zIndex: '1' }}>
          <Favorite setSearchData={setSearchData} />
        </section>
      </div>
    </>
  );
}

export default Homepage;
