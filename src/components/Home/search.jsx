import React, { useEffect, useState, useRef } from 'react';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { TbArrowsExchange } from 'react-icons/tb';
import { IoCalendarSharp } from 'react-icons/io5';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { getAirportData } from '@/Services/home/airport'; // Sesuaikan dengan impor yang benar
import { useNavigate } from '@tanstack/react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { FaSearch } from 'react-icons/fa'; // Ikon pencarian
import { IoCloseCircle } from 'react-icons/io5'; // Ikon silang

const FlightSearch = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [selectedDeptAirport, setSelectedDeptAirport] = useState('');
  const [selectedDestAirport, setSelectedDestAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [seatClass, setSeatClass] = useState('');
  const [passengers, setPassengers] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null); // Reference untuk tombol

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirportData();
        setAirports(data);
        setFilteredAirports(data); // Mengatur daftar bandara yang difilter
      } catch (error) {
        console.error('Error fetching airport data:', error);
      }
    };

    fetchAirports();
  }, []);

  const handleDeptAirportChange = (e) => setSelectedDeptAirport(e.target.value);
  const handleDestAirportChange = (e) => setSelectedDestAirport(e.target.value);
  const toggleReturnDate = () => setShowReturnDate(!showReturnDate);
  const handleExchange = () => {
    setSelectedDeptAirport(selectedDestAirport);
    setSelectedDestAirport(selectedDeptAirport);
  };
  const handleDeptDateChange = (e) => setDepartureDate(e.target.value);
  const handleRetDateChange = (e) => setReturnDate(e.target.value);
  const handlePassengerChange = (e) => setPassengers(e.target.value);
  const handleSeatClassChange = (e) => setSeatClass(e.target.value);

  // Fungsi pencarian bandara
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(query.toLowerCase()) ||
          airport.country.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAirports(filtered);
    } else {
      setFilteredAirports(airports); // Jika kosong, tampilkan semua bandara
    }
  };

  // Fungsi untuk menghapus pencarian
  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredAirports(airports); // Menampilkan semua bandara kembali
  };

  const PassengerDialog = () => {
    const [passengers, setPassengers] = useState({
      adult: 1, // Default Dewasa
      child: 0,
      infant: 0,
    });

    const buttonRef = useRef(null);

    const handleIncrement = (type) => {
      setPassengers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const handleDecrement = (type) => {
      setPassengers((prev) => ({
        ...prev,
        [type]: prev[type] > 0 ? prev[type] - 1 : 0, // Tidak boleh kurang dari 0
      }));
    };

    const handleInputChange = (e, type) => {
      const value = parseInt(e.target.value, 10) || 0;
      setPassengers((prev) => ({
        ...prev,
        [type]: value >= 0 ? value : 0, // Tidak boleh nilai negatif
      }));
    };
  };

  const handleSearchClick = () => {};

  return (
    <div className="max-w-full flex justify-center items-center p-2 lg-mt-[-100px] md:mt-[-50px]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Pilih Jadwal Penerbangan spesial di <span className="text-[#7126B5]">Tiketku!</span>
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-4 md:flex-1">
              <FaPlaneDeparture className="text-xl text-gray-500" />
              <label className="text-gray-500">From</label>
              <div className="flex-1">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button ref={buttonRef} className="w-full border-b-2 border-gray-300 text-left py-2 text-gray-500">
                      {selectedDeptAirport
                        ? airports.find((airport) => airport.id === selectedDeptAirport).city
                        : 'Pilih Penerbangan'}
                    </button>
                  </Dialog.Trigger>

                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                  <Dialog.Content
                    className="fixed w-[550px] bg-white border rounded-lg shadow-lg p-4"
                    style={{
                      top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY,
                      left: buttonRef.current?.getBoundingClientRect().left + window.scrollX,
                    }}
                  >
                    <div className="mb-4 relative">
                      <div className="flex items-center w-full">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Masukkan Kota atau Negara"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="w-full border border-gray-300 p-2 pl-10 text-gray-600 focus:outline-none focus:border-[#7126B5] rounded-md"
                        />
                        {searchQuery && (
                          <IoCloseCircle
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer w-6 h-6"
                            onClick={handleClearSearch}
                          />
                        )}
                      </div>
                    </div>
                    <Dialog.Title className="text-lg font-semibold">Kota dan Bandara Populer</Dialog.Title>

                    <div className="max-h-[100px] overflow-y-auto mt-4">
                      {filteredAirports.map((airport) => (
                        <button
                          key={airport.id}
                          onClick={() => {
                            setSelectedDeptAirport(airport.id);
                          }}
                          className="w-full text-left py-2 px-4 border-b hover:bg-[#E2D4F0] hover:cursor-pointer"
                        >
                          {airport.city} ({airport.code})
                        </button>
                      ))}
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </div>

            <TbArrowsExchange
              className="rounded-xl bg-black text-white p-1 w-8 h-8 cursor-pointer self-center md:self-auto"
              onClick={handleExchange}
            />

            <div className="flex items-center gap-4 md:flex-1">
              <FaPlaneArrival className="text-xl text-gray-500" />
              <label className="text-gray-500">To</label>
              <div className="flex-1">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button ref={buttonRef} className="w-full border-b-2 border-gray-300 text-left py-2 text-gray-500">
                      {selectedDestAirport
                        ? airports.find((airport) => airport.id === selectedDestAirport).city
                        : 'Pilih Tujuan'}
                    </button>
                  </Dialog.Trigger>

                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                  <Dialog.Content
                    className="fixed w-[550px] bg-white border rounded-lg shadow-lg p-4"
                    style={{
                      top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY,
                      left: buttonRef.current?.getBoundingClientRect().right + window.scrollX - 550, // Posisi kanan minus lebar modal
                    }}
                  >
                    <div className="mb-4 relative">
                      <div className="flex items-center w-full">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Masukkan Kota atau Negara"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="w-full border border-gray-300 p-2 pl-10 text-gray-600 focus:outline-none focus:border-[#7126B5] rounded-md"
                        />
                        {searchQuery && (
                          <IoCloseCircle
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer w-6 h-6"
                            onClick={handleClearSearch}
                          />
                        )}
                      </div>
                    </div>
                    <Dialog.Title className="text-lg font-semibold">Kota dan Bandara Populer</Dialog.Title>

                    <div className="max-h-[100px] overflow-y-auto mt-4">
                      {filteredAirports.map((airport) => (
                        <button
                          key={airport.id}
                          onClick={() => setSelectedDestAirport(airport.id)}
                          className="w-full text-left py-2 px-4 border-b hover:bg-[#E2D4F0] hover:cursor-pointer"
                        >
                          {airport.city} ({airport.code})
                        </button>
                      ))}
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
            <div className="flex flex-col gap-6 md:gap-4 md:flex-row md:flex-wrap flex-1">
              <div className="flex items-center gap-4 md:flex-[1]">
                <IoCalendarSharp className="text-xl text-gray-500" />
                <label className="text-gray-500">Date</label>
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex-1">
                    <label className="text-gray-500">Departure</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={handleDeptDateChange}
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#7126B5]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-500">Return</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={handleRetDateChange}
                      disabled={!showReturnDate}
                      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#7126B5]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="returnToggle"
                      checked={showReturnDate}
                      onChange={toggleReturnDate}
                      className="toggle-checkbox hidden"
                    />
                    <label htmlFor="returnToggle" className="flex items-center cursor-pointer">
                      <div className="relative">
                        <div
                          className={`w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
                            showReturnDate ? 'bg-[#7126B5]' : 'bg-gray-300'
                          }`}
                        ></div>
                        <div
                          className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full border-[1px] transition-transform duration-300 ease-in-out ${
                            showReturnDate ? 'translate-x-6 border-white' : 'translate-x-0 border-[#7126B5]'
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:flex-[2]">
              <MdAirlineSeatReclineNormal className="text-2xl text-gray-500" />
              <label className="text-gray-500">Seat</label>
              <div className="flex flex-1 items-center gap-4">
                <div className="flex-1">
                  <label className="text-gray-500">Passengers</label>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        ref={buttonRef}
                        className="w-full border-b-2 border-gray-300 text-left py-2 text-gray-500"
                      ></button>
                    </Dialog.Trigger>

                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                    <Dialog.Content
                      className="fixed w-[400px] bg-white border rounded-lg shadow-lg p-4"
                      style={{
                        top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY,
                        left: buttonRef.current?.getBoundingClientRect().left + window.scrollX,
                      }}
                    >
                      <Dialog.Title className="flex items-center justify-end text-lg font-bold border-b pb-2">
                        <button
                          className="text-gray-700 hover:text-gray-700 focus:outline-none"
                          aria-label="Close"
                          onClick={() => setIsOpen(false)}
                        >
                          &times;
                        </button>
                      </Dialog.Title>

                      <div className="max-h-[100px] overflow-y-auto mt-4">
                        {/* {[
                          { label: 'Dewasa', key: 'adult' },
                          { label: 'Anak', key: 'child' },
                          { label: 'Bayi', key: 'infant' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between mb-2">
                            <span className="text-gray-700">{item.label}</span>
                            <div className="flex items-center gap-2">
                              <button
                                className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                onClick={() => handleDecrement(item.key)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="w-12 h-8 text-center border border-gray-300 rounded"
                                value={passengers[item.key]}
                                onChange={(e) => handleInputChange(e, item.key)}
                              />
                              <button
                                className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                onClick={() => handleIncrement(item.key)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))} */}
                      </div>
                    </Dialog.Content>
                  </Dialog.Root>
                </div>
                <div className="flex-1">
                  <label className="text-gray-500">Seat Class</label>
                  <div>
                    {/* Trigger untuk membuka modal */}
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          ref={buttonRef}
                          className="w-full border-b-2 border-gray-300 focus:outline-none py-2 text-left text-gray-500"
                        >
                          {seatClass || ''} {/* Default placeholder */}
                        </button>
                      </Dialog.Trigger>

                      {/* Overlay untuk background modal */}
                      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

                      {/* Konten Modal */}
                      <Dialog.Content
                        className="fixed w-[300px] bg-white border rounded-lg shadow-lg p-4"
                        style={{
                          top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY,
                          left: buttonRef.current?.getBoundingClientRect().left + window.scrollX,
                        }}
                      >
                        <Dialog.Title className="flex items-center justify-end text-lg font-bold border-b pb-2">
                          <button
                            className="text-gray-700 hover:text-gray-700 focus:outline-none"
                            aria-label="Close"
                            onClick={() => setIsOpen(false)}
                          >
                            &times;
                          </button>
                        </Dialog.Title>

                        {/* Opsi */}
                        {/* <div className="flex flex-col gap-2">
                          {['Business', 'Economy'].map((option) => (
                            <button
                              key={option}
                              className={`px-4 py-2 text-left rounded ${
                                seatClass === option ? 'bg-[#7126B5] text-white' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                              onClick={() => handleSelect(option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div> */}

                        {/* Tombol Close */}
                        <div className="flex justify-end mt-4">
                          <Dialog.Close asChild>
                            <button className="text-gray-500 hover:text-gray-700 px-4 py-2">Tutup</button>
                          </Dialog.Close>
                        </div>
                      </Dialog.Content>
                    </Dialog.Root>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleSearchClick}
            className="w-full py-3 px-4 bg-[#7126B5] text-white rounded-lg shadow-lg hover:bg-[#5a1e9d] focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
          >
            Cari Penerbangan
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
