import { createLazyFileRoute, useNavigate, useSearch, Link } from '@tanstack/react-router';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { getTransactionHistory } from '@/Services/history/transaction';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { DatePickerWithRange } from '@/components/HistoryComponent/DateRangePicker';
import { addDays } from 'date-fns';
import { SeacrhPopUp } from '@/components/HistoryComponent/SearchPopup';
import { HistoryItem } from '@/components/History/HistoryItem';
import { Loading } from '@/components/Loading';
import { DetailFlight, Pricing } from '@/components/PassengerForm/detail-flight';
import { FaChevronCircleUp } from 'react-icons/fa';
import { dateToString } from '@/utils/dateInSearch';
import { ButtonHistory } from '@/components/History/ButtonHistory';
import { printTicket } from '@/Services/history/transaction';
import { motion } from 'framer-motion';

export const Route = createLazyFileRoute('/history/')({
  component: History,
});

function History() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const searchParams = Route.useSearch();

  const startDate = searchParams.SD;
  const endDate = searchParams.ED;
  const bookingCode = searchParams.BC || '';

  const [history, setHistory] = useState([]);
  const [active, setActive] = useState(null);
  const [activeDetail, setActiveDetail] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [passenger, setPassenger] = useState([]);

  const handleBackToList = () => {
    setIsDetailView(false);
  };

  const handleHistoryItemClick = (index) => {
    setActive(index);
    if (window.innerWidth < 768) {
      setIsDetailView(true);
    }
  };

  useEffect(() => {
    if (activeDetail?.bookings) {
      const passengerCounts = {
        ADULT: 0,
        CHILD: 0,
        INFANT: 0,
      };

      activeDetail.bookings.forEach((booking) => {
        if (booking.passenger && booking.passenger.type) {
          passengerCounts[booking.passenger.type]++;
        }
      });

      setPassenger([
        {
          type: 'ADULT',
          quantity: passengerCounts.ADULT,
        },
        {
          type: 'CHILD',
          quantity: passengerCounts.CHILD,
        },
        {
          type: 'INFANT',
          quantity: passengerCounts.INFANT,
        },
      ]);
    }
  }, [activeDetail]);

  useEffect(() => {
    if (active !== null) {
      setActiveDetail(history[active]);
    }
  }, [active, history]);

  const {
    data: historyData,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['history', bookingCode, startDate, endDate],
    queryFn: ({ pageParam = 1 }) => getTransactionHistory(bookingCode, startDate, endDate, pageParam),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.meta?.page;
      const pageCount = lastPage?.meta?.pageCount;

      return currentPage < pageCount ? currentPage + 1 : undefined;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (transactionId) => printTicket(transactionId),
    onSuccess: () => {
      toast.success('Tiket Berhasil Dicetak, Cek Email Anda');
    },
    onError: () => {
      toast.error('Gagal Mencetak Tiket');
    },
  });

  const handleSubmit = (bookingCode, startDate, endDate) => {
    if (!startDate || !endDate) {
      navigate({ search: { BC: bookingCode } });
    } else {
      navigate({
        search: {
          BC: bookingCode,
          SD: dateToString(startDate),
          ED: dateToString(endDate),
        },
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setHistory(historyData.pages.map((page) => page.data).flat());
    } else if (isError) {
      toast.error('Gagal memuat data riwayat penerbangan');
    }
  }, [historyData, isSuccess, isError]);

  useEffect(() => {
    if (!token) {
      navigate({ to: '/auth/login' });
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar isAuth={true} searchBar={true} />
      <Toaster position="top-right" />
      <FaChevronCircleUp
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-10 right-10 w-[2rem] h-[2rem] cursor-pointer hover:text-[#A06ECE]"
      />
      <div className="w-screen min-h-[90vh] px-4 md:px-[10vw]">
        <p className="mt-[5vh] mb-[4vh] font-semibold text-xl">Riwayat Pemesanan</p>
        <div className="w-full flex md:flex-row flex-col gap-3 justify-center">
          <div className="bg-[#A06ECE] gap-2 px-5 flex items-center w-full h-[3rem] text-white text-[1rem] rounded-2xl">
            <FaArrowLeft onClick={() => navigate({ to: '/' })} className="cursor-pointer" />
            <p>Beranda</p>
          </div>
          <DatePickerWithRange
            bookingCode={bookingCode}
            handleSubmit={handleSubmit}
            setDate={setDate}
            date={date}
            className={'flex-grow'}
          />
          <SeacrhPopUp handleSubmit={handleSubmit} />
        </div>

        {isLoading ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <div className="md:hidden">
              {!isDetailView ? (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="flex flex-col mt-[5vh] gap-[5vh]"
                >
                  <HistoryItem data={history} className="w-full" active={active} setActive={handleHistoryItemClick} />
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    className="text-md pb-[3vh] -mt-10 text-[#7126B5] font-semibold"
                  >
                    {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4 mt-[5vh] mb-5">
                  <button onClick={handleBackToList} className="text-[#A06ECE] flex items-center gap-2">
                    <FaArrowLeft /> Kembali ke Daftar
                  </button>
                  {activeDetail?.departureFlight && (
                    <>
                      <DetailFlight
                        isHistory={true}
                        history={activeDetail?.bookings}
                        data={activeDetail?.departureFlight}
                        returnData={false}
                      />
                      {activeDetail?.returnFlight && (
                        <DetailFlight
                          isHistory={true}
                          history={activeDetail?.bookings}
                          data={activeDetail?.returnFlight}
                          returnData={true}
                        />
                      )}
                      <Pricing data={activeDetail} passenger={passenger} />
                      <ButtonHistory
                        status={activeDetail?.payment?.status}
                        transactionId={activeDetail?.id}
                        onPrint={mutate}
                        isPending={isPending}
                      />
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex justify-center mt-[5vh] gap-[5vw]">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col md:w-[60%] w-[100%] gap-[5vh]"
              >
                <HistoryItem data={history} className="w-full" active={active} setActive={setActive} />
                <button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                  className="text-md pb-[3vh] -mt-10 text-[#7126B5] font-semibold"
                >
                  {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
                </button>
              </motion.div>
              {history.length > 0 && (
                <div className="flex flex-col w-[40%] gap-[2vh]">
                  {activeDetail?.departureFlight && (
                    <>
                      <DetailFlight
                        isHistory={true}
                        history={activeDetail?.bookings}
                        className={''}
                        data={activeDetail?.departureFlight}
                        returnData={false}
                      />
                      {activeDetail?.returnFlight && (
                        <DetailFlight
                          isHistory={true}
                          history={activeDetail?.bookings}
                          className={''}
                          data={activeDetail?.returnFlight}
                          returnData={true}
                        />
                      )}
                      <Pricing data={activeDetail} passenger={passenger} />
                      <ButtonHistory
                        status={activeDetail?.payment?.status}
                        transactionId={activeDetail?.id}
                        onPrint={mutate}
                        isPending={isPending}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
