import { formatDate } from '@/utils/dateInSearch';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { mapping } from '@/utils/mappingClass';

export const LabelSearch = ({ departureCity, destinationCity, typePlane, passengerTotal }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex md:flex-row flex-col gap-3 px-2">
      <div className="bg-[#A06ECE] gap-2 p-4 flex items-center w-full text-white text-sm rounded-2xl">
        <FaArrowLeft onClick={() => navigate({ to: '/' })} className="cursor-pointer" />
        {departureCity && (
          <>
            <p className="ml-[2vw]">
              {departureCity} &#x279C; {destinationCity}
            </p>
            -
          </>
        )}
        <p>{passengerTotal} Penumpang</p> -<p>{mapping[typePlane.toUpperCase()]}</p>
      </div>
      <Link
        to={'/'}
        className="bg-[#73CA5C] flex justify-center items-center gap-4 p-4 shrink-0 text-white text-sm rounded-2xl hover:bg-[#50993d]"
      >
        Ubah Pencarian
      </Link>
    </div>
  );
};

export const SearchDate = ({ dates, handleDateChange, departureDate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid px-2 grid-cols-3 gap-4 md:grid-cols-6 mb-4 mt-6"
    >
      {dates.map((date, index) => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return (
          <motion.div key={index} variants={childVariants}>
            <Button
              key={index}
              disabled={date < today}
              onClick={() => handleDateChange(date)}
              className={`flex text-sm bg-transparent text-black flex-col gap-2 w-full font-light p-4 border
                    ${
                      date.toDateString() === departureDate.toDateString()
                        ? 'bg-[#A06ECE] text-white hover:bg-[#A06ECE]'
                        : 'hover:bg-[#A06ECE] hover:text-white'
                    }`}
            >
              <p className="font-semibold">{date.toLocaleDateString('id-ID', { weekday: 'long' })}</p>
              <p>{formatDate(date)}</p>
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
