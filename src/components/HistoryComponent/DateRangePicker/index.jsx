import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FaFilter } from 'react-icons/fa';

export const DatePickerWithRange = ({ className, date, setDate }) => {
  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <button className="btn btn-primary flex items-center justify-center gap-[1vw] rounded-full border border-[#7126B5] px-[2vw] py-[1vh]">
            <span>
              <FaFilter className="text-[#7126B5]" />
            </span>
            <span className="text-[#7126B5] font-semibold">Filter</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex flex-col justify-center" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
          <Button className="bg-[#7126B5] text-white hover:bg-[#7126B5]">Terapkan</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
