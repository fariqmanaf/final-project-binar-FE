import { FaPlane } from 'react-icons/fa6';
import { formatLocaleDate } from '@/utils/dateInSearch';

export const YourFlight = ({ DD, departureCity, destinationCity, RD, DF, PD }) => {
  return (
    <div className="w-full border border-slate-200 rounded-[2rem] shadow-lg">
      <div className="flex gap-[2vw] justify-center items-center h-[7vh] bg-[#A06ECE] text-white rounded-t-[2rem]">
        <FaPlane className="w-[3vh] h-[3vh]" />
        <p className="text-sm">Penerbangan Anda</p>
      </div>
      <div className="flex  gap-[1rem] items-center h-[10vh] p-[3vw]">
        <div className="bg-[#A06ECE] px-[1rem] py-[0.5rem] text-sm rounded-[1rem] text-white font-semibold">1</div>
        <div className="">
          <p className="text-sm">{PD !== null ? formatLocaleDate(PD) : formatLocaleDate(DD)}</p>
          <p className="text-sm">
            {departureCity} &#x279C; {destinationCity}
          </p>
        </div>
      </div>
      <hr />
      {RD !== null && (
        <div className={`${DF === null ? 'opacity-50' : 'opacity-100'} flex gap-[1rem] items-center h-[10vh] p-[3vw]`}>
          <div className="bg-[#A06ECE] px-[1rem] py-[0.5rem] text-sm rounded-[1rem] text-white font-semibold">2</div>
          <div className="">
            <p className="text-sm">{formatLocaleDate(RD)}</p>
            <p className="text-sm">
              {destinationCity} &#x279C; {departureCity}
            </p>
          </div>
        </div>
      )}
      {RD === null && DF !== null && (
        <div className="flex gap-[1rem] items-center h-[10vh] p-[3vw]">
          <div className="bg-[#A06ECE] px-[1vw] py-[1vh] text-sm rounded-[1vw] text-white font-semibold">2</div>
          <div className="">
            <p className="text-sm">{formatLocaleDate(DD)}</p>
            <p className="text-sm">
              {destinationCity} &#x279C; {departureCity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
