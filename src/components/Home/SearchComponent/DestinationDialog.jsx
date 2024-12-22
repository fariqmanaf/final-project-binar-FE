import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

const DeestinationDialog = ({ airports, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter bandara berdasarkan input pencarian
  const filteredAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" bg-white border rounded-lg p-4 shadow-lg max-w-[400px] w-full">
      {/* Input Pencarian */}
      <div className="mb-4 relative">
        <div className="flex items-center w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Masukkan Kota atau Negara"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 p-2 pl-10 text-gray-600 focus:outline-none focus:border-[#7126B5] rounded-md"
          />
          {searchQuery && (
            <IoIosClose
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer w-6 h-6"
              onClick={() => setSearchQuery('')}
            />
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold">Kota dan Bandara Populer</h3>

      {/* Daftar Bandara */}
      <div className="max-h-[200px] overflow-y-auto mt-2">
        {filteredAirports.map((airport) => (
          <button
            key={airport.id}
            onClick={() => onSelect(airport)}
            className="w-full text-left py-2 px-4 border-b hover:bg-[#E2D4F0] cursor-pointer"
          >
            {airport.name} - {airport.city} ({airport.code})
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeestinationDialog;
