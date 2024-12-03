import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { NavbarIcon } from '@/components/Navbar/icon-navbar';

const Navbar = ({ searchBar, isAuth }) => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  return (
    <nav className="w-full bg-white shadow-md h-[10vh] flex justify-center">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="h-10 cursor-pointer" onClick={() => navigate('/')} />

        {/* Search Bar */}
        {searchBar && (
          <div className="flex-1 mx-10">
            <div className="flex items-center bg-[#EEEEEE] rounded-full px-3 max-w-sm overflow-hidden">
              <input
                type="text"
                placeholder="Cari di sini ..."
                className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-sm py-3"
              />
              <img src="/search.svg" alt="search-icon" className="w-5 h-5 text-gray-500 mr-2" />
            </div>
          </div>
        )}

        {/* Navigation Items */}
        {isAuth && (
          <div className="flex items-center gap-6 mr-[2rem]">
            {token ? (
              <>
                <NavbarIcon Content="History" ImageLink="/list.svg" Redirect="/history" />
                <NavbarIcon Content="Notification" ImageLink="/bell.svg" Redirect="/notification" />
                <NavbarIcon Content="Account" ImageLink="/person.svg" Redirect="/account" />
              </>
            ) : (
              <Button className="rounded-xl bg-[#7126B5] h-12 hover:bg-[#4c0f85]">
                <img src="/log-in.svg" alt="login-icon" className="mr-2" />
                <Link to={'/auth/login'}>Masuk</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
