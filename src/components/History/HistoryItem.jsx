import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '@radix-ui/themes';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import PropTypes from 'prop-types';

const HistoryItem = ({ data, onSelectedOrder, selectedOrderId }) => {
  const [displayedData, setDisplayedData] = useState(data);

  const groupByMonthYear = (transactions) => {
    if (!Array.isArray(transactions)) return {}; // Ensure transactions is an array
    return transactions.reduce((acc, transaction) => {
      const departureDate = transaction.departureFlight?.departureTimestamp;
      if (!departureDate) return acc;

      // Menggunakan toLocaleDateString dengan parameter 'id-ID' untuk format tanggal Indonesia
      const formattedDate = new Date(departureDate).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Memecah tanggal menjadi [day, month, year] berdasarkan format yang lebih konsisten
      const [day, month, year] = formattedDate.split(' ');

      // Memastikan format bulan dan tahun benar
      const groupKey = `${month} ${year}`;

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(transaction);

      return acc;
    }, {});
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const getBadgeClass = (status) => {
    const formattedStatus =
      status === 'PENDING' ? 'Unpaid' : status === 'FAILED' ? 'canceled' : status === 'SUCCESS' ? 'Issued' : status; // Untuk status lainnya tidak diubah

    switch (formattedStatus) {
      case 'Issued':
        return 'bg-[#73CA5C] text-white';
      case 'Unpaid':
        return 'bg-[#FF0000] text-white';
      case 'canceled':
        return 'bg-[#8A8A8A] text-black';
      default:
        return 'bg-[#8A8A8A] text-black';
    }
  };

  const formatDuration = (durationMinutes) => {
    const hours = Math.floor(durationMinutes / 60); // Menghitung jam
    const minutes = durationMinutes % 60; // Menghitung sisa menit
    return `${hours} jam ${minutes} menit`; // Mengembalikan format
  };

  const groupedTransactions = groupByMonthYear(displayedData);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDisplayedData(data);
    } else {
      setDisplayedData([]); // Set an empty array if data is not an array
    }
  }, [data]);

  return (
    <div className="mx-auto w-full sm:max-w-[600px] md:max-w-[800px]">
      {Object.entries(groupedTransactions).map(([monthYear, transactions], index) => (
        <div key={index} className="mb-6">
          <h5 className="text-primary font-bold mt-3 text-base sm:text-lg">{monthYear}</h5>

          {transactions.map((transaction, index) => (
            <Card
              key={index}
              onClick={() => {
                onSelectedOrder(transaction);
              }}
              className="mb-4"
              style={{
                border: transaction.id === selectedOrderId ? '2px solid #7126B5' : '1px solid #E5E5E5',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.25s ease-in-out',
                padding: '15px',
                width: '100%',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge className={`px-3 py-1 rounded-full ${getBadgeClass(transaction.payment?.status)}`}>
                    {transaction.payment?.status === 'SUCCESS'
                      ? 'Issued'
                      : transaction.payment?.status === 'PENDING'
                        ? 'Unpaid'
                        : 'Canceled'}
                  </Badge>
                </div>

                {/* Departure Flight */}
                <div className="flex justify-between items-center mb-4">
                  <FaLocationDot
                    className="inline-block text-gray-600"
                    style={{ fontSize: '20px', marginBottom: '15px' }}
                  />
                  <div className="text-left">
                    <p className="font-bold text-sm sm:text-base">
                      {transaction.departureFlight?.departureAirport?.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.departureFlight?.departureTimestamp).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    <p className="text-sm text-gray-600">
                      {new Date(transaction.departureFlight?.departureTimestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      {formatDuration(transaction.departureFlight?.durationMinutes)}
                    </p>
                    <div className="flex items-center justify-center">
                      <hr className="border-gray-900 w-[100px] hidden md:block" />
                      <IoIosArrowRoundForward className="text-gray-900" />
                    </div>
                  </div>
                  <FaLocationDot
                    className="inline-block text-gray-600"
                    style={{ fontSize: '20px', marginBottom: '15px' }}
                  />
                  <div className="text-left">
                    <p className="font-bold text-sm sm:text-base inline">
                      {transaction.departureFlight?.destinationAirport?.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.departureFlight?.arrivalTimestamp).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    <p className="text-sm text-gray-600">
                      {new Date(transaction.departureFlight?.arrivalTimestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-sm sm:text-base">Booking Code:</p>
                    <p className="text-sm text-gray-700">{transaction.code}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base">Class:</p>
                    <p className="text-sm text-gray-700">{transaction.departureFlight?.type}</p>
                  </div>
                  <div className="text-right">
                    <h6 className="text-[#4B1979] font-bold text-sm sm:text-base">
                      {formatRupiah(transaction.departureFlight?.price)}
                    </h6>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

HistoryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      payment: PropTypes.shape({
        status: PropTypes.string.isRequired,
      }).isRequired,
      departureFlight: PropTypes.shape({
        departureAirport: PropTypes.shape({
          city: PropTypes.string.isRequired,
        }).isRequired,
        departureTimestamp: PropTypes.string.isRequired,
        durationMinutes: PropTypes.number.isRequired,
        destinationAirport: PropTypes.shape({
          city: PropTypes.string.isRequired,
        }).isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onSelectedOrder: PropTypes.func.isRequired,
  selectedOrderId: PropTypes.string,
};

export default memo(HistoryItem);
