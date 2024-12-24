import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { NavbarIcon } from '@/components/Navbar/icon-navbar';
import { IoIosList } from 'react-icons/io';
import { FiBell } from 'react-icons/fi';
import { RxPerson } from 'react-icons/rx';

const Navbar = ({ searchBar, isAuth }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setShowNavbar(true);
      }, 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="h-[10vh]"></div>
      <nav
        className={`w-full bg-white shadow-md h-[10vh] flex justify-center px-[5vw] fixed top-0 z-50 transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <img src="/logo.svg" alt="Logo" className="h-10 cursor-pointer" onClick={() => navigate({ to: '/' })} />

          {searchBar && (
            <div className="flex-1 mx-10">
              <div className="md:flex hidden items-center bg-[#EEEEEE] rounded-full px-3 max-w-sm overflow-hidden">
                <input
                  type="text"
                  placeholder="Cari di sini ..."
                  className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-sm py-3"
                />
                <img src="/search.svg" alt="search-icon" className="w-5 h-5 text-gray-500 mr-2" />
              </div>
            </div>
          )}

          {isAuth && (
            <div className="flex items-center gap-6 mr-[2rem]">
              {token ? (
                <>
                  <NavbarIcon Content="History" ImageLink="/list.svg" Redirect="/history" />
                  <NavbarIcon Content="Notification" ImageLink="/bell.svg" Redirect="/notification" />
                  <NavbarIcon Content="Account" ImageLink="/person.svg" Redirect="/account" />
                </>
              ) : (
                <Link
                  to={'/auth/login'}
                  className="rounded-xl bg-[#7126B5] w-[10rem] h-[6vh] flex justify-center items-center hover:bg-[#4c0f85]"
                >
                  <img src="/log-in.svg" alt="login-icon" className="mr-2" />
                  <p className="text-white">Masuk</p>
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
