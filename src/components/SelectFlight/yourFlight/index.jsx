import { FaPlane } from 'react-icons/fa6';
import { formatLocaleDate } from '@/utils/dateInSearch';

export const YourFlight = ({ DD, departureCity, destinationCity, RD, DF, PD }) => {
  return (
    <div className="w-full border border-slate-200 rounded-[2vw] shadow-lg">
      <div className="flex gap-[2vw] justify-center items-center h-[7vh] bg-[#A06ECE] text-white rounded-t-[2vw]">
        <FaPlane className="w-[3vh] h-[3vh]" />
        <p className="text-[2.2vh]">Penerbangan Anda</p>
      </div>
      <div className="flex  gap-[1vw] items-center h-[10vh] p-[3vw]">
        <div className="bg-[#A06ECE] px-[1vw] py-[1vh] text-[2vh] rounded-[1vw] text-white font-semibold">1</div>
        <div className="">
          <p className="text-[2vh]">{PD !== null ? formatLocaleDate(PD) : formatLocaleDate(DD)}</p>
          <p className="text-[2vh]">
            {departureCity} &#x279C; {destinationCity}
          </p>
        </div>
      </div>
      <hr />
      {RD !== null && (
        <div className={`${DF === null ? 'opacity-50' : 'opacity-100'} flex gap-[1vw] items-center h-[10vh] p-[3vw]`}>
          <div className="bg-[#A06ECE] px-[1vw] py-[1vh] text-[2vh] rounded-[1vw] text-white font-semibold">2</div>
          <div className="">
            <p className="text-[2vh]">{formatLocaleDate(RD)}</p>
            <p className="text-[2vh]">
              {destinationCity} &#x279C; {departureCity}
            </p>
          </div>
        </div>
      )}
      {RD === null && DF !== null && (
        <div className="flex gap-[1vw] items-center h-[10vh] p-[3vw]">
          <div className="bg-[#A06ECE] px-[1vw] py-[1vh] text-[2vh] rounded-[1vw] text-white font-semibold">2</div>
          <div className="">
            <p className="text-[2vh]">{formatLocaleDate(DD)}</p>
            <p className="text-[2vh]">
              {destinationCity} &#x279C; {departureCity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
