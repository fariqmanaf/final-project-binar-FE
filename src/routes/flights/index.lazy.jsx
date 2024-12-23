import * as React from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Loading } from '@/components/Loading';
import Navbar from '@/components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { getDatesAround } from '@/utils/dateInSearch';
import { SearchDate, LabelSearch } from '@/components/SelectFlight';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getFlightByQuery } from '@/Services/flight/selectFlight';
import { NotFound } from '@/components/SelectFlight/notFound';
import { YourFlight } from '@/components/SelectFlight/yourFlight';
import { AccordionFlight } from '@/components/SelectFlight/accordionFlight';
import { motion } from 'framer-motion';
import { FilterFlight } from '@/components/SelectFlight/filter';

export const Route = createLazyFileRoute('/flights/')({
  component: SelectFlight,
});

function SelectFlight() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate();

  let RD = searchParams?.RD ? new Date(searchParams?.RD) : null;
  const DF = searchParams?.DF ? searchParams?.DF : null;
  let DD = searchParams?.DD ? new Date(searchParams?.DD) : new Date();
  const PD = searchParams?.PD ? new Date(searchParams?.PD) : null;
  const A = searchParams?.A ? parseInt(searchParams?.A) : null;
  const C = searchParams?.C ? parseInt(searchParams?.C) : null;
  const I = searchParams?.I ? parseInt(searchParams?.I) : null;
  const type = searchParams?.SC ? searchParams?.SC : null;

  const [departureDate, setDepartureDate] = useState(DD);
  const [flightsData, setFlightsData] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (searchParams?.DD) {
      setDepartureDate(new Date(searchParams.DD));
    }
  }, [searchParams?.DD]);

  const dates = getDatesAround(departureDate, 2, 3);
  const querySearch = `departureDate=${DD.toISOString().split('T')[0]}&departureAirportId=${searchParams?.DA}&destinationAirportId=${searchParams?.AA}&sortBy=${filter || ''}&type=${type?.toUpperCase()}`;

  const {
    data: flights,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['flights', querySearch],
    queryFn: ({ pageParam = 1 }) => getFlightByQuery(querySearch, pageParam),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta.page;
      const pageCount = lastPage.meta.pageCount;

      return currentPage < pageCount ? currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setFlightsData(flights.pages.map((page) => page.data).flat());
    } else if (isError) {
      toast.error('Gagal memuat data penerbangan');
    }
  }, [flights, isSuccess, isError]);

  const handleDateChange = (date) => {
    setDepartureDate(date);
    if (RD !== null) {
      navigate({
        search: {
          DD: date.toISOString().split('T')[0],
          DA: searchParams?.DA,
          AA: searchParams?.AA,
          RD: searchParams?.RD,
          DF: searchParams?.DF,
          A: searchParams?.A,
          C: searchParams?.C,
          I: searchParams?.I,
        },
      });
    } else {
      navigate({
        search: {
          DD: date.toISOString().split('T')[0],
          DA: searchParams?.DA,
          AA: searchParams?.AA,
          A: searchParams?.A,
          C: searchParams?.C,
          I: searchParams?.I,
        },
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar searchBar={true} isAuth={true} />
      <div className="w-screen flex justify-center md:px-[10vw] px-[5vw]">
        <div className="bg-white w-[100vw] h-[50vh] mt-[7vh]">
          <p className="text-[3vh] font-semibold mb-[3vh]">Pilih Penerbangan</p>
          <LabelSearch
            departureCity={flightsData[0]?.departureAirport?.code}
            destinationCity={flightsData[0]?.destinationAirport?.code}
            passengerTotal={A + C + I}
            typePlane={type ? type : 'All'}
          />
          <SearchDate dates={dates} handleDateChange={handleDateChange} departureDate={departureDate} />
          <div className="mt-[3vh] w-full flex justify-end px-[3vw]">
            <FilterFlight setFilter={setFilter} />
          </div>
          <div className="w-[100%] h-full mt-[3vh] flex flex-col md:flex-row justify-between items-center gap-[5vw]">
            <div className="w-full h-full flex justify-center">
              {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Loading text={'Mencari penerbangan terbaik...'} />
                </div>
              ) : flightsData.length === 0 ? (
                <NotFound />
              ) : (
                <div className="w-full flex flex-col md:flex-row justify-between gap-[3vw]">
                  <div className="md:w-[30%] w-full h-full flex justify-center items-start">
                    <YourFlight
                      DD={departureDate}
                      DF={DF}
                      RD={RD}
                      PD={PD}
                      departureCity={flightsData[0]?.departureAirport?.city}
                      destinationCity={flightsData[0]?.destinationAirport?.city}
                    />
                  </div>
                  <div className="md:w-[70%] w-full flex flex-col gap-[3vh]">
                    <AccordionFlight flight={flightsData} RD={RD} DF={DF} DD={departureDate} A={A} C={C} I={I} />
                    <motion.button
                      layout
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                      className="text-md pb-[3vh] text-[#7126B5] font-semibold"
                    >
                      {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
