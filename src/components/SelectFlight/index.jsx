import { formatDate } from '@/utils/dateInSearch';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'motion/react';

export const LabelSearch = ({ departureCity, destinationCity }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex gap-3">
      <div className="bg-[#A06ECE] gap-2 px-5 flex items-center w-[80%] h-[7vh] text-white text-[2vh] rounded-2xl">
        <FaArrowLeft onClick={() => navigate({ to: '/' })} className="cursor-pointer" />
        {departureCity && (
          <>
            <p className="ml-[2vw]">
              {departureCity} &#x279C; {destinationCity}
            </p>
            -
          </>
        )}
        <p>2 Penumpang</p> -<p>Economy</p>
      </div>
      <Link
        to={'/'}
        className="bg-[#73CA5C] flex justify-center items-center gap-4 px-5 py-3 w-[20%] h-[7vh] text-white text-[2vh] rounded-2xl hover:bg-[#50993d]"
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
      className="grid grid-cols-3 space-y-2 md:space-y-0 md:grid-cols-6 space-x-2 mt-[4vh] px-[2vw]"
    >
      {dates.map((date, index) => (
        <motion.div key={index} variants={childVariants} className="w-">
          <Button
            variants={childVariants}
            key={index}
            onClick={() => handleDateChange(date)}
            className={`flex text-[2vh] bg-transparent text-black flex-col gap-0 w-full h-[7vh] font-light border-r
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
      ))}
    </motion.div>
  );
};
