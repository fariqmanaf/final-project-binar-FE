import { getAirportData } from '@/Services/home/airport';
import { useState, useEffect } from 'react';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { TbArrowsExchange } from 'react-icons/tb';
import * as Popover from '@radix-ui/react-popover';
import DepartureDialog from './SearchComponent/DepartureDialog';
import { IoCalendarSharp } from 'react-icons/io5';
import DayDialog from './SearchComponent/DayDialog';
import * as Switch from '@radix-ui/react-switch';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import PassengerDialog from './SearchComponent/PassengerDialog';
import SeatClassDialog from './SearchComponent/ClassDialog';
import DeestinationDialog from './SearchComponent/DestinationDialog';
import { Button } from '../ui/button';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useLocalStorage } from '../hooks/use-local-storage';

const SearchFlight = ({ searchData }) => {
  const navigate = useNavigate();
  const [airports, setAirports] = useLocalStorage('airports', []);
  const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
  const [isDestDialogOpen, setIsDestDialogOpen] = useState(false);
  const [isDateDeptDialogOpen, setIsDateDeptDialogOpen] = useState(false);
  const [isDateDestDialogOpen, setIsDateDestDialogOpen] = useState(false);
  const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [isReturnChecked, setIsReturnChecked] = useState('');
  const [selectedDeptAirport, setSelectedDeptAirport] = useState(null);
  const [selectedDestAirport, setSelectedDestAirport] = useState(null);
  const [selectedDeptDate, setSelectedDeptDate] = useState();
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState();
  const [selectedPassengers, setSelectedPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirportData();
        setAirports(data);
      } catch {
        toast.error('Failed to fetch airports');
      }
    };
    fetchAirports();
  }, []);

  const handleSelectDeptAirport = (airport) => {
    setSelectedDeptAirport(airport.id);
    setIsDeptDialogOpen(false);
  };

  const handleSelectDestAirport = (airport) => {
    setSelectedDestAirport(airport.id);
    setIsDestDialogOpen(false);
  };

  const availableDeptAirports = airports.filter((airport) => airport.id !== selectedDestAirport);

  const availableDestAirports = airports.filter((airport) => airport.id !== selectedDeptAirport);

  const handleSwitchAirports = () => {
    setSelectedDeptAirport(selectedDestAirport);
    setSelectedDestAirport(selectedDeptAirport);
  };

  const handleSelectDeptDate = (date) => {
    if (date === null) {
      setSelectedDeptDate(null); // Menghapus tanggal jika nilai null
    } else {
      setSelectedDeptDate(date);
    }
    setIsDateDeptDialogOpen(false); // Menutup dialog setelah memilih tanggal
  };

  const handleSelectReturnDate = (date) => {
    if (date === null) {
      setSelectedReturnDate(null); // Reset return date jika null
    } else {
      setSelectedReturnDate(date); // Menyimpan tanggal yang dipilih
    }
    setIsDateDestDialogOpen(false); // Menutup dialog setelah memilih tanggal
  };

  const handleSwitchReturn = (checked) => {
    setIsReturnChecked(checked);
  };

  const handleSelectCounts = (counts) => {
    setSelectedPassengers(counts);
  };

  const getTotalPassengers = () => {
    return selectedPassengers.adult + selectedPassengers.child;
  };

  useEffect(() => {
    const savedSearchData = JSON.parse(localStorage.getItem('searchData'));
    if (searchData == null) {
      if (savedSearchData) {
        const currentTime = new Date().getTime();
        const savedTime = savedSearchData.timestamp;
        const oneHour = 60 * 60 * 1000;

        if (currentTime - savedTime > oneHour) {
          localStorage.removeItem('searchData');
        } else {
          setSelectedDeptAirport(savedSearchData.selectedDeptAirport);
          setSelectedDestAirport(savedSearchData.selectedDestAirport);
          setSelectedDeptDate(new Date(savedSearchData.selectedDeptDate));
          setSelectedReturnDate(
            savedSearchData.selectedReturnDate ? new Date(savedSearchData.selectedReturnDate) : null
          );
          setSelectedClass(savedSearchData.selectedClass);
          setSelectedPassengers(savedSearchData.selectedPassengers);
          setIsReturnChecked(savedSearchData.selectedReturnDate ? true : false);
        }
      } else {
        // Set default values if no saved search data is found
        setSelectedDeptAirport(airports[0]?.id || null);
        setSelectedDestAirport(airports[1]?.id || null);
        setSelectedDeptDate(new Date(Date.now()));
      }
    } else {
      const currentDate = new Date();
      const deptDate = new Date(searchData.departureDate);
      const returnDate = new Date(searchData.returnDate);

      setSelectedDeptAirport(searchData.selectedDeptAirport);
      setSelectedDestAirport(searchData.selectedDestAirport);
      setSelectedDeptDate(deptDate < currentDate ? currentDate : deptDate);
      setSelectedReturnDate(returnDate < currentDate ? currentDate : returnDate);
      setSelectedClass(searchData.seatClass);
      setSelectedPassengers({
        adult: 1,
        child: 0,
        infant: 0,
      });
    }
  }, [airports, searchData]);

  const handleSearchFlights = () => {
    const formatDateToLocal = (date) => {
      const offset = date.getTimezoneOffset();
      const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
      return adjustedDate.toISOString().split('T')[0];
    };

    localStorage.setItem(
      'searchData',
      JSON.stringify({
        selectedDeptAirport,
        selectedDestAirport,
        selectedDeptDate: selectedDeptDate ? formatDateToLocal(selectedDeptDate) : null,
        selectedReturnDate: isReturnChecked
          ? selectedReturnDate
            ? formatDateToLocal(selectedReturnDate)
            : null
          : null,
        selectedClass,
        selectedPassengers,
        isReturnChecked,
        timestamp: new Date().getTime(),
      })
    );

    const searchParams = {
      DA: selectedDeptAirport,
      AA: selectedDestAirport,
      DD: selectedDeptDate ? formatDateToLocal(selectedDeptDate) : null,
      RD: selectedReturnDate && isReturnChecked === true ? formatDateToLocal(selectedReturnDate) : null,
      A: selectedPassengers.adult,
      C: selectedPassengers.child,
      I: selectedPassengers.infant,
      SC: selectedClass,
    };

    if (!searchParams.DA || !searchParams.AA || !searchParams.DD) {
      toast.error('Mohon lengkapi semua filter pencarian yang wajib!');
      return;
    }

    const queryString = Object.entries(searchParams)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    navigate({ to: `/flights/?${queryString}` });
  };

  const displayType = {
    ECONOMY: 'Economy',
    PREMIUM: 'Premium Economy',
    BUSINESS: 'Business',
    FIRST_CLASS: 'First Class',
  };

  return (
    <div className="w-full flex justify-center items-center p-2 lg-mt-[-100px] md:mt-[-50px]">
      <div className="bg-white rounded-xl border w-full max-w-4xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Pilih Jadwal Penerbangan spesial di <span className="text-[#7126B5]">Tiketku!</span>
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
            {/* Departure Airport Filter */}
            <div className="flex items-center gap-4 md:flex-1">
              <FaPlaneDeparture className="text-xl text-gray-500" />
              <label className="text-gray-500">From</label>
              <div className="flex-1 w-full">
                <Popover.Root open={isDeptDialogOpen} onOpenChange={setIsDeptDialogOpen}>
                  <Popover.Trigger className="w-full">
                    <div
                      className={`text-left md:truncate md:max-w-64 lg:max-w-72 ${selectedDeptAirport ? 'font-bold text-black' : 'text-gray-500'}`}
                    >
                      {selectedDeptAirport
                        ? `${airports.find((airport) => airport.id === selectedDeptAirport)?.name} - ${airports.find((airport) => airport.id === selectedDeptAirport)?.city} ${airports.find((airport) => airport.id === selectedDeptAirport)?.code}`
                        : 'Pilih Penerbangan'}
                    </div>
                  </Popover.Trigger>
                  <hr className="w-full border-gray-300 border-[1.5px]" />

                  <Popover.Content side="bottom" align="start" className="h-[200px] z-[1]">
                    <DepartureDialog airports={availableDeptAirports} onSelect={handleSelectDeptAirport} />
                  </Popover.Content>
                </Popover.Root>
              </div>
            </div>

            <TbArrowsExchange
              className="rounded-xl sm:shrink-0 bg-black text-white p-1 w-8 h-8 cursor-pointer self-center md:self-auto hover:bg-gray-500"
              onClick={handleSwitchAirports}
            />

            {/* Destination Airport Filter */}
            <div className="flex items-center gap-4 md:flex-1">
              <FaPlaneArrival className="text-xl text-gray-500" />
              <label className="text-gray-500">To</label>
              <div className="flex-1 w-full">
                <Popover.Root open={isDestDialogOpen} onOpenChange={setIsDestDialogOpen}>
                  <Popover.Trigger className="w-full">
                    <div
                      className={`text-left md:truncate md:max-w-64 lg:max-w-72 ${selectedDestAirport ? 'font-bold text-black' : 'text-gray-500'}`}
                    >
                      {selectedDestAirport
                        ? `${airports.find((airport) => airport.id === selectedDestAirport)?.name} - ${airports.find((airport) => airport.id === selectedDestAirport)?.city} (${airports.find((airport) => airport.id === selectedDestAirport)?.code})`
                        : 'Pilih Tujuan'}
                    </div>
                  </Popover.Trigger>
                  <hr className="w-full border-gray-300 border-[1.5px]" />
                  <Popover.Content side="bottom" align="start" className="h-[200px] z-[1]">
                    <DeestinationDialog airports={availableDestAirports} onSelect={handleSelectDestAirport} />
                  </Popover.Content>
                </Popover.Root>
              </div>
            </div>
          </div>

          {/* Date picker */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
            <div className="flex flex-col gap-6 md:gap-4 md:flex-row md:flex-wrap flex-1">
              <div className="flex items-center gap-4 md:flex-1">
                <IoCalendarSharp className="text-xl text-gray-500" />
                <label className="text-gray-500">Date</label>
                <div className="flex flex-1 w-full items-center gap-4">
                  <div className="flex-1 flex flex-col">
                    <label className="text-gray-500">Departure</label>
                    <Popover.Root open={isDateDeptDialogOpen} onOpenChange={setIsDateDeptDialogOpen}>
                      <Popover.Trigger>
                        <div
                          className={`w-full text-sm cursor-pointer py-2 text-start ${
                            selectedDeptDate ? 'font-bold text-black' : 'text-[#5a1e9d]'
                          }`}
                        >
                          {selectedDeptDate ? selectedDeptDate.toLocaleDateString() : 'Pilih Tanggal'}
                        </div>
                      </Popover.Trigger>
                      <hr className="w-full border-gray-300 border-[1.5px]" />
                      <Popover.Content side="bottom" align="start" className="z-[1]">
                        <DayDialog onSelectDate={handleSelectDeptDate} onClose={() => setIsDateDeptDialogOpen(false)} />
                      </Popover.Content>
                    </Popover.Root>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="text-gray-500">Return</label>
                    <Popover.Root open={isDateDestDialogOpen} onOpenChange={setIsDateDestDialogOpen}>
                      <Popover.Trigger>
                        <div
                          className={`text-sm cursor-pointer py-2 text-start ${
                            !isReturnChecked
                              ? 'opacity-50 pointer-events-none'
                              : selectedReturnDate
                                ? 'font-bold text-black'
                                : 'text-[#5a1e9d]'
                          }`}
                        >
                          {selectedReturnDate ? selectedReturnDate.toLocaleDateString() : 'Pilih Tanggal'}
                        </div>
                      </Popover.Trigger>
                      <hr className="w-full border-gray-300 border-[1.5px]" />
                      <Popover.Content side="bottom" align="start" className="z-[1]">
                        {isReturnChecked && <DayDialog onSelectDate={handleSelectReturnDate} />}
                      </Popover.Content>
                    </Popover.Root>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch.Root
                      className={`w-10 h-6 rounded-full relative transition-colors ${isReturnChecked ? 'bg-[#7126B5]' : 'bg-gray-300'}`}
                      id="return-date-switch"
                      checked={isReturnChecked}
                      onCheckedChange={handleSwitchReturn}
                    >
                      <Switch.Thumb
                        className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isReturnChecked ? 'translate-x-5' : 'translate-x-1'}`}
                      />
                    </Switch.Root>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat information */}
            <div className="flex items-center gap-4 md:flex-1">
              <MdAirlineSeatReclineNormal className="text-2xl text-gray-500" />
              <label className="text-gray-500">Seat</label>
              <div className="flex flex-1 items-center gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="text-gray-500">Passengers</label>
                  <Popover.Root open={isPassDialogOpen} onOpenChange={setIsPassDialogOpen}>
                    <Popover.Trigger>
                      <div
                        className="cursor-pointer text-sm py-2 text-gray-900 font-bold text-start"
                        onClick={() => setIsPassDialogOpen(true)}
                      >
                        {getTotalPassengers() > 0 ? `${getTotalPassengers()} Penumpang` : 'Jumlah Penumpang'}
                      </div>
                    </Popover.Trigger>
                    <hr className="w-full border-gray-300 border-[1px]" />
                    <Popover.Content side="bottom" className="z-[1]">
                      <PassengerDialog onClose={() => setIsPassDialogOpen(false)} onSelectCounts={handleSelectCounts} />
                    </Popover.Content>
                  </Popover.Root>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-gray-500 font-normal">Seat Class</label>
                  <Popover.Root open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
                    <Popover.Trigger>
                      <div
                        className={`cursor-pointer text-sm py-2 text-start ${selectedClass ? 'font-bold text-black' : 'text-gray-500 font-normal'}`}
                        onClick={() => setIsClassDialogOpen(true)}
                      >
                        {selectedClass ? displayType[selectedClass] : 'Pilih Kelas'}
                      </div>
                    </Popover.Trigger>
                    <hr className="w-full border-gray-300 border-[1px]" />
                    <Popover.Content side="bottom" align="start" className="w-[400px] max-w-none z-[1]">
                      <SeatClassDialog
                        onClose={() => setIsClassDialogOpen(false)}
                        onSelectClass={(selectedClass) => setSelectedClass(selectedClass)}
                        dept={selectedDeptAirport}
                        dest={selectedDestAirport}
                        deptDate={selectedDeptDate}
                        retDate={selectedReturnDate}
                      />
                    </Popover.Content>
                  </Popover.Root>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={handleSearchFlights}
            className="w-full py-3 px-4 bg-[#7126B5] text-white rounded-lg shadow-lg hover:bg-[#5a1e9d] focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
            disabled={!selectedDeptAirport || !selectedDestAirport || !selectedDeptDate}
          >
            Cari Penerbangan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
