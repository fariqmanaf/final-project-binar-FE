import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FaSearch } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const SeacrhPopUp = ({ className, handleSubmit }) => {
  const [tempBookingCode, setTempBookingCode] = useState('');

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <button className="border border-[#7126B5] md:border-0 flex justify-center items-center gap-[1vw] p-2 rounded-full">
            <FaSearch className="self-center w-[1.2rem] h-[1.2rem] text-[#7126B5] cursor-pointer" />
            <span className="text-[#7126B5] font-semibold block md:hidden">Search</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <div className="p-4 flex flex-col justify-center gap-4">
            <label className="text-[#7126B5] font-semibold">Filter</label>
            <Input
              onChange={(e) => {
                e.preventDefault();
                setTempBookingCode(e.target.value);
              }}
              placeholder="Cari kode booking"
            />
            <Button
              onClick={() => handleSubmit(tempBookingCode)}
              className="bg-[#7126B5] text-white hover:bg-[#7126B5]"
            >
              Cari
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
