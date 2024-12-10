import * as React from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectFlight as AccordionComponent } from '../../components/SelectFlight/index';

export const Route = createLazyFileRoute('/flight/selectFlight')({
  component: SelectFlight,
});

function SelectFlight() {
  const navigate = useNavigate();
  const today = dayjs();
  const dates = Array.from({ length: 7 }, (_, i) => ({
    day: today.add(i, 'day').format('dddd'),
    date: today.add(i, 'day').format('DD/MM/YYYY'),
  }));

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <div className="flex justify-center h-screen px-4 lg:px-0">
      <div className="flex flex-col items-start mt-8 w-full lg:w-10/12">
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="text-xl lg:text-2xl">
            <strong>Pilih Penerbangan</strong>
          </h1>
          <div className="flex-1"></div>
        </div>

        <div className="w-full flex items-center flex-col lg:flex-row mb-4">
          <div className="flex-1 bg-[#A06ECE] text-white p-4 rounded-xl mb-4 lg:mb-0 lg:mr-1.5 flex items-center h-16">
            <img
              src="/fi_arrow-left.svg"
              alt="back-button"
              className="cursor-pointer mr-2"
              onClick={() => navigate({ to: `/auth/register` })}
            />
            <span>JKT To MLB - 2 Penumpang - Economy</span>
          </div>
          <Button className="bg-[#73CA5C] text-white rounded-xl p-4 h-16 flex items-center justify-center w-full lg:w-[250px]">
            Ubah Pencarian
          </Button>
        </div>

        <div className="w-full flex flex-wrap justify-around mt-4 items-center">
          {dates.map((item, index) => (
            <React.Fragment key={index}>
              <Button
                onClick={() => setSelectedIndex(index)}
                className={`flex flex-col items-center p-4 lg:p-10 rounded-lg mb-4 
                            ${selectedIndex === index ? 'bg-[#A06ECE] text-black' : 'bg-[#ffffff] text-black'} 
                            hover:bg-[#ffffff]`}
              >
                <strong className="text-lg">{item.day}</strong>
                <span className="text-sm">{item.date}</span>
              </Button>
              {index < dates.length - 1 && (
                <Separator orientation="vertical" className="w-0.5 h-10 lg:mr-0.5 lg:ml-0.5" />
              )}
            </React.Fragment>
          ))}
        </div>
        <Separator orientation="horizontal" className="w-full my-4 h-0.5" />

        <div className="w-full flex justify-end mt-4">
          <Select className="w-full lg:w-auto border border-[#A06ECE] rounded-3xl">
            <SelectTrigger className="w-full lg:w-auto border-[#A06ECE] rounded-3xl text-[#A06ECE]">
              <img src="/updownarrow.svg" alt="arrow-icon" className="cursor-pointer mr-2" />
              <SelectValue placeholder="Filter" className="text-[#A06ECE]" />
            </SelectTrigger>
            <SelectContent className="text-[#A06ECE] bg-white border border-[#A06ECE] rounded-xl">
              <SelectGroup>
                <SelectItem value="Termurah" className="flex items-center focus:bg-[#7126B5]">
                  <b>Harga</b> - Termurah
                </SelectItem>
                <Separator orientation="horizontal" className="w-full" />
                <SelectItem value="Terpendek" className="flex items-center focus:bg-[#7126B5]">
                  <b>Durasi</b> - Terpendek
                </SelectItem>
                <Separator orientation="horizontal" className="w-full" />
                <SelectItem value="Keberangkatan-Awal" className="flex items-center focus:bg-[#7126B5]">
                  <b>Keberangkatan</b> - Paling Awal
                </SelectItem>
                <Separator orientation="horizontal" className="w-full" />
                <SelectItem value="Keberangkatan-Akhir" className="flex items-center focus:bg-[#7126B5]">
                  <b>Keberangkatan</b> - Paling Akhir
                </SelectItem>
                <Separator orientation="horizontal" className="w-full" />
                <SelectItem value="Kedatangan-Awal" className="flex items-center focus:bg-[#7126B5]">
                  <b>Kedatangan</b> - Paling Awal
                </SelectItem>
                <Separator orientation="horizontal" className="w-full" />
                <SelectItem value="Kedatangan-Akhir" className="flex items-center focus:bg-[#7126B5]">
                  <b>Kedatangan</b> - Paling Akhir
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between mt-4">
          <div className="lg:sticky lg:top-0 border border-[#e0e0e0] rounded-lg p-4 w-full lg:w-[40%] shadow-md lg:h-full">
            <h3 className="text-lg font-bold mb-4">Filter</h3>
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img src="/fi_box.svg" alt="transit-icon" className="cursor-pointer mr-2" />
                  <span>Transit</span>
                </div>
                <ChevronRight />
              </button>
            </div>
            <Separator orientation="horizontal" className="w-full my-4 h-0.5" />
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img src="/fi_heart.svg" alt="facilities-icon" className="cursor-pointer mr-2" />
                  <span>Fasilitas</span>
                </div>
                <ChevronRight />
              </button>
            </div>
            <Separator orientation="horizontal" className="w-full my-4 h-0.5" />
            <div className="flex items-center justify-between">
              <button className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img src="/fi_dollar-sign.svg" alt="price-icon" className="cursor-pointer mr-2" />
                  <span>Harga</span>
                </div>
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="w-full lg:ml-5 mt-4 lg:mt-0">
            <AccordionComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
