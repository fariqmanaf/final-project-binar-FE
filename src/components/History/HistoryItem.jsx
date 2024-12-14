import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '@radix-ui/themes';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import PropTypes from 'prop-types';

const HistoryItem = ({ data, onSelectedOrder, selectedOrder }) => {
  const [displayedData, setDisplayedData] = useState(data);

  const groupByMonthYear = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const departureDate = `${transaction.departureFlight?.departureTimestamp}`;
      if (!departureDate) return acc;

      const date = new Date(departureDate);
      const groupKey = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(transaction);

      return acc;
    }, {});
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'FAILED':
        return 'bg-[#FF0000] text-white';
      case 'SUCCESS':
        return 'bg-[#73CA5C] text-white';
      default:
        return 'bg-[#8A8A8A] text-black';
    }
  };

  const groupedTransactions = groupByMonthYear(displayedData);

  useEffect(() => {
    setDisplayedData(data);
  }, [data]);

  return (
    <div className="mx-auto w-full sm:max-w-[600px] md:max-w-[800px]">
      {Object.entries(groupedTransactions)?.map(([monthYear, transactions], index) => (
        <div key={index} className="mb-6">
          <h5 className="text-primary font-bold mt-3 text-base sm:text-lg">{monthYear}</h5>

          {transactions?.map((transaction, idx) => {
            // Loop through bookings since the actual transaction might be in `bookings`
            return transaction.bookings.map((booking, bookingIdx) => {
              const departureFlight = transaction.departureFlight;
              const payment = transaction.payment;
              return (
                <Card
                  key={bookingIdx}
                  onClick={() => onSelectedOrder(transaction)}
                  className="mb-4"
                  style={{
                    border: transaction.id === selectedOrder ? '2px solid #7126B5' : '1px solid #E5E5E5',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease-in-out',
                    padding: '20px',
                    width: '100%',
                    fontSize: '14px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge className={`px-3 py-1 rounded-full ${getBadgeClass(payment?.status)}`}>
                        {payment?.status}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <FaLocationDot
                        className="inline-block text-gray-600"
                        style={{ fontSize: '20px', marginBottom: '15px' }}
                      />
                      <div className="text-left">
                        <p className="font-bold text-sm sm:text-base">{departureFlight?.departureAirport?.city}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(departureFlight?.departureTimestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">{departureFlight?.flightNumber}</p>
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
                          {departureFlight?.destinationAirport?.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(departureFlight?.arrivalTimestamp).toLocaleString()}
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
                        <p className="text-sm text-gray-700">{departureFlight?.type}</p>
                      </div>
                      <div className="text-right">
                        <h6 className="text-[#4B1979] font-bold text-sm sm:text-base">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                            payment?.amount
                          )}
                        </h6>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            });
          })}
        </div>
      ))}
    </div>
  );
};

HistoryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      payment: PropTypes.shape({
        status: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      }).isRequired,
      departureFlight: PropTypes.shape({
        departureAirport: PropTypes.shape({
          city: PropTypes.string.isRequired,
        }).isRequired,
        destinationAirport: PropTypes.shape({
          city: PropTypes.string.isRequired,
        }).isRequired,
        departureTimestamp: PropTypes.string.isRequired,
        arrivalTimestamp: PropTypes.string.isRequired,
        flightNumber: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectedOrder: PropTypes.func.isRequired,
  selectedOrder: PropTypes.string,
};

export default memo(HistoryItem);
