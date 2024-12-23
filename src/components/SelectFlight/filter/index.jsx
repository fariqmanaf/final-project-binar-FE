import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FaFilter } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const FilterFlight = ({ setFilter }) => {
  const [active, setActive] = useState(null);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="btn btn-primary flex items-center gap-[1vw] rounded-full border border-[#7126B5] px-[2vw] py-[1vh]">
          <span>
            <FaFilter className="text-[#7126B5]" />
          </span>
          {active ? (
            <span className="text-[#7126B5] font-semibold text-sm">{active}</span>
          ) : (
            <span className="text-[#7126B5] font-semibold">Filter</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-[1vh]">
          <Button
            variant="primary"
            size="sm"
            className="flex justify-start font-semibold hover:bg-[#7126B5] hover:text-white"
            onClick={() => {
              setFilter('cheapestPrice');
              setActive('Harga - Termurah');
            }}
          >
            Harga <span className="font-normal">- Termurah</span>
          </Button>
          <hr />
          <Button
            variant="primary"
            size="sm"
            className="flex justify-start font-semibold hover:bg-[#7126B5] hover:text-white"
            onClick={() => {
              setFilter('shortestDuration');
              setActive('Durasi - Terpendek');
            }}
          >
            Durasi <span className="font-normal">- Terpendek</span>
          </Button>
          <hr />
          <Button
            variant="primary"
            size="sm"
            className="flex justify-start font-semibold hover:bg-[#7126B5] hover:text-white"
            onClick={() => {
              setFilter('earliestDeparture');
              setActive('Keberangkatan - Paling Awal');
            }}
          >
            Keberangkatan <span className="font-normal">- Paling Awal</span>
          </Button>
          <hr />
          <Button
            variant="primary"
            size="sm"
            className="flex justify-start font-semibold hover:bg-[#7126B5] hover:text-white"
            onClick={() => {
              setFilter('latestDeparture');
              setActive('Keberangkatan - Paling Akhir');
            }}
          >
            Keberangkatan <span className="font-normal">- Paling Akhir</span>
          </Button>
          <hr />
          <Button
            variant="primary"
            size="sm"
            className="flex justify-start font-semibold hover:bg-[#7126B5] hover:text-white"
            onClick={() => {
              setFilter('earliestArrival');
              setActive('Kedatangan - Paling Awal');
            }}
          >
            Kedatangan <span className="font-normal">- Paling Awal</span>
          </Button>
          <hr />
          <Button
            variant="primary"
            size="sm"
            className="flex justify-start font-semibold hover:bg-[#7126B5] hover:text-white"
            onClick={() => {
              setFilter('latestArrival');
              setActive('Kedatangan - Paling Akhir');
            }}
          >
            Kedatangan <span className="font-normal">- Paling Akhir</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
