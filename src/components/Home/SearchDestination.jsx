import React, { useState } from 'react';
import Favorite from './Favorite';
// import searchIconWhite from '/assets/icons/fi_search-white.svg';
// import searchIconBlack from '../../assets/icons/fi_search-black.svg';

const SearchDestination = () => {
  const [selectedContinent, setSelectedContinent] = useState('');

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
  };

  return (
    <>
      <div className="px-[200px] flex gap-x-4 mb-5">
        <div
          className={`w-[126px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer ${selectedContinent === '' ? 'bg-[#7126B5] text-white' : 'bg-[#E2D4F0] text-black'} hover:bg-purple-900`}
          onClick={() => handleContinentClick('')}
        >
          <a className="flex items-center gap-2 text-sm font-medium">
            {/* <img src={searchIconWhite} alt="" className="w-5 h-5" /> */}
            Semua
          </a>
        </div>

        <div
          className={`w-[126px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer ${selectedContinent === 'ASIA' ? 'bg-[#7126B5] text-white' : 'bg-[#E2D4F0] text-black'} hover:bg-purple-900`}
          onClick={() => handleContinentClick('ASIA')}
        >
          <a className="flex items-center gap-2 text-sm font-medium">
            {/* <img src={searchIconBlack} alt="" className="w-5 h-5" /> */}
            Asia
          </a>
        </div>

        <div
          className={`w-[126px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer ${selectedContinent === 'AMERICA' ? 'bg-[#7126B5] text-white' : 'bg-[#E2D4F0] text-black'} hover:bg-purple-900`}
          onClick={() => handleContinentClick('AMERICA')}
        >
          <a className="flex items-center gap-2 text-sm font-medium">
            {/* <img src={searchIconBlack} alt="" className="w-5 h-5" /> */}
            Amerika
          </a>
        </div>

        <div
          className={`w-[126px] h-[48px] rounded-xl flex items-center justify-center cursor-pointer ${selectedContinent === 'AUSTRALIA' ? 'bg-[#7126B5] text-white' : 'bg-[#E2D4F0] text-black'} hover:bg-purple-900`}
          onClick={() => handleContinentClick('AUSTRALIA')}
        >
          <a className="flex items-center gap-2 text-sm font-medium">
            {/* <img src={searchIconBlack} alt="" className="w-5 h-5" /> */}
            Australia
          </a>
        </div>
      </div>

      <Favorite continent={selectedContinent} />
    </>
  );
};

export default SearchDestination;
