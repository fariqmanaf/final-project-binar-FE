import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import notFoundPict from '/notFoundPict.svg';
import HistoryDetail from '@/components/History/HistoryDetail';
import HistoryItem from '@/components/History/HistoryItem';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from 'react-icons/fa';
import { LuFilter } from 'react-icons/lu';
import { IoSearchSharp } from 'react-icons/io5';
import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseSharp } from 'react-icons/io5';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { parse } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { getTransactionHistory } from '@/Services/history/transaction';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const Route = createLazyFileRoute('/history/')({
  component: History,
});

function History() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track if the filter has been applied
  const [selectedOrder, setSelectedOrder] = useState(history[0] || null);
  const [filteredData, setFilteredData] = useState(history);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await getTransactionHistory();
        setHistory(data);
        setFilteredData(data);
      } catch (error) {
        setError(err.message);
      }
    };

    if (token) {
      fetchTransaction();
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate({ to: '/auth/login' });
    }
  }, [token, navigate]);

  useEffect(() => {
    loadSearchHistory(); // Load search history when the component mounts
  }, []);

  useEffect(() => {
    if (filteredData.length > 0 && !filteredData.find((item) => item.id === selectedOrder?.id)) {
      setSelectedOrder(filteredData[0]);
    }
  }, [filteredData]);

  const handleFilter = () => {
    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);

    const filtered = history.filter((item) => {
      const itemDate = new Date(item.departureFlight?.departureTimestamp);

      return itemDate >= start && itemDate <= end;
    });

    setFilteredData(filtered);
    setIsFilterApplied(true);
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSelectOrder = (order) => {
    const selected = filteredData.find((item) => item.id === order?.id);
    setSelectedOrder(selected);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toUpperCase();
    setSearchQuery(query);
    const filtered = history.filter(
      (item) =>
        item.code.toUpperCase().includes(query) || // Search by booking code
        item.bookings[0].passenger.name.toUpperCase().includes(query) // Search by passenger name
    );
    setFilteredData(filtered);
  };

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
      saveSearchHistory(searchQuery); // Save search query when Enter is pressed
    }
  };

  const handleCloseFilter = () => {
    setIsFilterActive(false);
    setSearchQuery('');
    setFilteredData(history);
    setIsFilterApplied(false);
  };

  const saveSearchHistory = (query) => {
    if (query && !searchHistory.includes(query)) {
      const updatedHistory = [query, ...searchHistory].slice(0, 5); // Limit to 5 recent searches
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Save to localStorage
    }
  };

  const loadSearchHistory = () => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory)); // Load from localStorage
    }
  };

  const handleSearchFromHistory = (query) => {
    setSearchQuery(query);
    const filtered = history.filter((item) => item.code.toUpperCase().includes(query));
    setFilteredData(filtered);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar isAuth={true} searchBar={true} />
      <main className="flex flex-col justify-center w-screen items-center">
        {/* Header */}
        <section
          className="flex justify-center w-full items-center shadow-sm fixed top-[60px] bg-white"
          style={{ zIndex: '2' }}
        >
          <div className="container w-screen px-[4rem]">
            {/* Filter and Title */}
            <h1 className="text-xl font-bold mt-[3rem] mb-[3rem]">Riwayat Pemesanan</h1>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center w-full">
                <Link
                  to={'/'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#9b59b6',
                    borderRadius: '10px',
                    border: 'none',
                    width: '85%',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    marginRight: '20px',
                    color: 'white',
                    padding: '10px',
                  }}
                >
                  <FaArrowLeft style={{ marginRight: '8px' }} />
                  Beranda
                </Link>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    {/* Wrapping button inside the trigger but without nesting buttons */}
                    <Button
                      className={`flex items-center mr-4 transition-colors ${
                        isFilterApplied
                          ? 'bg-[#A06ECE] text-white hover:bg-white hover:text-[#A06ECE]'
                          : 'bg-transparent text-gray-500 hover:bg-[#A06ECE] hover:text-white'
                      }`}
                      variant="outline-secondary"
                      style={{
                        borderRadius: '20px',
                        display: 'flex',
                        border: '1.5px solid #A06ECE',
                        padding: '4px 10px',
                        height: '32px',
                      }}
                      onClick={isFilterApplied ? handleCloseFilter : () => setIsFilterActive(true)}
                    >
                      {isFilterApplied ? (
                        <IoCloseSharp className="text-white bg-[#A06ECE] hover:bg-[#fff] hover:text-[#A06ECE]" />
                      ) : (
                        <LuFilter className="text-gray-500" />
                      )}
                      {isFilterApplied ? 'Tutup Filter' : 'Filter'}
                    </Button>
                  </Dialog.Trigger>

                  {/* Overlay */}
                  {isFilterActive && <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />}

                  <Dialog.Title>
                    <VisuallyHidden>Riwayat Pencarian</VisuallyHidden>
                  </Dialog.Title>
                  <Dialog.Content
                    className="mx-5 fixed top-[65%] left-[70%] lg:left-[80%] transform -translate-x-[80%] -translate-y-[50%] w-[90%] max-w-[370px] min-h-[390px] bg-white border border-gray-300 rounded-lg shadow-lg p-4 scrollbar-thin scrollbar-thumb-[#A06ECE] scrollbar-track-[#EDE7F6]"
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                    style={{
                      transition: 'all 0.3s ease-in-out',
                      maxHeight: '360px',
                      overflowY: 'auto', // Pastikan overflowY diatur
                    }}
                  >
                    <Dialog.Close>
                      <IoCloseSharp
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          color: '#999',
                          cursor: 'pointer',
                          width: '24px',
                          height: '24px',
                        }}
                      />
                    </Dialog.Close>

                    {/* Garis Horizontal */}
                    <hr className="mt-2 mb-2 border-gray-300" />

                    <div className="flex flex-col w-full mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
                      <DateRangePicker
                        ranges={dateRange}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        rangeColors={['#A06ECE']}
                        showSelectionPreview={true}
                        staticRanges={[]}
                        inputRanges={[]}
                      />
                    </div>

                    {/* Add Dialog.Description */}
                    <Dialog.Description id="dialog-description" className="sr-only">
                      Filter untuk riwayat pencarian.
                    </Dialog.Description>

                    <hr className="mt-2 mb-2 border-gray-300" />

                    <div className="flex justify-end items-center">
                      <Button className="bg-[#4B1979]" onClick={handleFilter} style={{ zIndex: 10 }}>
                        Terapkan Filter
                      </Button>
                    </div>
                  </Dialog.Content>
                </Dialog.Root>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    {/* Replace Button with a div or span */}
                    <div
                      className="flex items-center p-1 hover:text-black"
                      style={{ border: 'none', backgroundColor: 'transparent' }}
                      onClick={handleCloseFilter}
                    >
                      {searchQuery ? (
                        <IoCloseSharp className="font-bold text-[#7126B5]" style={{ width: '28px', height: '28px' }} />
                      ) : (
                        <IoSearchSharp className="font-bold text-[#7126B5]" style={{ width: '28px', height: '28px' }} />
                      )}
                    </div>
                  </Dialog.Trigger>
                  <Dialog.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                  <Dialog.Content className="mx-5 fixed top-[50%] sm:left-[60%] md:left-[75%] lg:left-[83%] transform -translate-x-[80%] -translate-y-[50%] w-[90%] max-w-[400px] bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                    <div style={{ marginBottom: '1rem', position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'between' }}>
                        <IoSearchSharp
                          style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#999',
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Masukkan Nomor Penerbangan"
                          value={searchQuery}
                          onChange={handleSearch} // Added handler for search input
                          onKeyDown={handleSearchEnter} // Added Enter key handler
                          style={{
                            width: '90%',
                            border: '1px solid #ccc',
                            padding: '0.5rem 0.5rem 0.5rem 2rem',
                            color: '#4a4a4a',
                            borderRadius: '4px',
                            outline: 'none',
                            borderColor: '#7126B5',
                          }}
                        />
                        <IoCloseSharp
                          style={{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#999',
                            cursor: 'pointer',
                            width: '25px',
                            height: '25px',
                            marginRight: '0px',
                          }}
                          onClick={() => setSearchQuery('')}
                        />
                      </div>
                    </div>
                    <Dialog.Title
                      style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      Riwayat Pencarian
                      {searchHistory.length > 0 && (
                        <Button onClick={handleClearHistory} style={{ background: 'transparent', color: '#FF0000' }}>
                          Hapus
                        </Button>
                      )}
                    </Dialog.Title>
                    <ul className="space-y-2 justify-between">
                      {searchHistory.map((history, index) => (
                        <li
                          className="text-gray-500 hover:text-[#7126B5] cursor-pointer"
                          key={index}
                          onClick={() => handleSearchFromHistory(history)}
                        >
                          {history}
                          <IoCloseSharp
                            style={{
                              position: 'absolute',
                              right: '2rem',
                              bottom: '10%',
                              transform: 'translateY(-50%)',
                              color: '#999',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleClearHistory('')}
                          />
                          <hr className="mt-2 text-gray-700" />
                        </li>
                      ))}
                    </ul>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </div>
          </div>
        </section>
        {/* Main Content */}
        <section
          className="flex flex-col justify-center w-full items-center shadow-sm mt-[15rem]"
          style={{ position: 'relative', zIndex: '1' }}
        >
          <div className="container w-screen px-[4rem]">
            {/* Adjusted margin-top */}
            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-5 text-center">
                <img src={notFoundPict} alt="History Not Found" className="img-fluid mb-3" />
                <h5 className="font-bold text-[#673AB7]">Oops! Riwayat pemesanan kosong!</h5>
                <p className="mb-4">Anda belum memiliki riwayat pemesanan</p>
                <Link
                  to={'/'}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#673AB7',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    border: 'none',
                    textDecoration: 'none',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Cari Penerbangan
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row w-full justify-between items-start mt-5">
                  <div className="w-full md:w-1/2">
                    <HistoryItem
                      key={selectedOrder ? selectedOrder.id : 'default-key'}
                      data={filteredData}
                      onSelectedOrder={handleSelectOrder}
                      selectedOrderId={selectedOrder ? selectedOrder.id : null} // Pastikan diteruskan dengan benar
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-5 md:mt-0">
                    {selectedOrder ? <HistoryDetail data={[selectedOrder]} /> : null}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default History;
