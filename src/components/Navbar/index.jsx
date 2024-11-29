import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();

  // Ambil token dari Redux
  const token = useSelector((state) => state.auth.token);

  return (
    <nav className="w-full bg-white fixed shadow-md py-3">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="h-10 cursor-pointer" onClick={() => navigate('/')} />

        {/* Search Bar */}
        <div className="flex-1 ml-4">
          <div className="flex items-center bg-[#EEEEEE] rounded-full px-3 max-w-sm overflow-hidden">
            <input
              type="text"
              placeholder="Cari di sini ..."
              className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-sm py-3"
            />
            <img src="/search.svg" alt="search-icon" className="w-5 h-5 text-gray-500 mr-2" />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center ml-auto space-x-4">
          {token ? (
            // Jika sudah login, tampilkan navigasi items
            <>
              <Link to={'/'}>
                <img src="/list.svg" alt="list" className="w-6 h-6 cursor-pointer" />
              </Link>
              <Link to={'/'}>
                <img src="/bell.svg" alt="bell" className="w-6 h-6 cursor-pointer" />
              </Link>
              <Link to={'/'}>
                <img src="/person.svg" alt="person" className="w-6 h-6 cursor-pointer" />
              </Link>
            </>
          ) : (
            // Jika belum login, tampilkan tombol "Masuk"
            <Button className="rounded-xl bg-[#7126B5] h-12 hover:bg-[#4c0f85]">
              <img src="/log-in.svg" alt="login-icon" className="mr-2" />
              <Link to={'/auth/login'}>Masuk</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
