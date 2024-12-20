import { createLazyFileRoute, useNavigate, useSearch, Link } from '@tanstack/react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
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

export const Route = createLazyFileRoute('/history/')({
  component: History,
});

function History() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const searchParams = Route.useSearch();

  const startDate = searchParams.SD;
  const endDate = searchParams.ED;

  const [history, setHistory] = useState([]);
  const [active, setActive] = useState(null);
  const [activeDetail, setActiveDetail] = useState(null);
  console.log('activeDetail', activeDetail);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [bookingCode, setBookingCode] = useState(searchParams.BC || '');

  const passenger = [
    {
      type: 'ADULT',
      quantity: activeDetail,
    },
    {
      type: 'CHILD',
      quantity: searchParams?.C ? parseInt(searchParams?.C) : 0,
    },
    {
      type: 'INFANT',
      quantity: searchParams?.I ? parseInt(searchParams?.I) : 0,
    },
  ];

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
    queryFn: ({ pageParam = 1 }, bookingCode, startDate, endDate) =>
      getTransactionHistory(bookingCode, startDate, endDate, pageParam),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.meta?.page;
      const pageCount = lastPage?.meta?.pageCount;

      return currentPage < pageCount ? currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setHistory(historyData.pages.map((page) => page).flat());
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
      <div className="w-screen h-[90vh] px-[10vw]">
        <p className="md:mt-[10vh] mt-[5vh] mb-[4vh] font-semibold text-xl">Riwayat Pemesanan</p>
        <div className="w-full flex md:flex-row flex-col gap-3 justify-center">
          <div className="bg-[#A06ECE] gap-2 px-5 flex items-center w-full h-[7vh] text-white text-[1rem] rounded-2xl">
            <FaArrowLeft onClick={() => navigate({ to: '/' })} className="cursor-pointer" />
            <p>Beranda</p>
          </div>
          <DatePickerWithRange setDate={setDate} date={date} className={'flex-grow'} />
          <SeacrhPopUp setBookingCode={setBookingCode} />
        </div>
        <div className="flex justify-center mt-[5vh] gap-[5vw]">
          {isLoading ? (
            <div className="w-full h-[60vh] flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <>
              <div className="flex flex-col w-[60%] gap-[5vh]">
                <HistoryItem data={history} className="w-full" active={active} setActive={setActive} />
              </div>
              <div className="flex flex-col w-[40%] gap-[5vh]">
                {activeDetail?.departureFlight && (
                  <>
                    <DetailFlight
                      className={'mt-[7vh] sticky top-[20%]'}
                      data={activeDetail?.departureFlight}
                      returnData={false}
                    />
                    {activeDetail?.returnFlight && (
                      <DetailFlight
                        className={'mt-[7vh] sticky top-[20%]'}
                        data={activeDetail?.returnFlight}
                        returnData={true}
                      />
                    )}
                  </>
                )}

                {/* {activeDetail?.returnFlight && <DetailFlight data={activeDetail?.returnFlight} returnData={true} />}
                <Pricing data={activeDetail} passenger={passenger} />{' '} */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
