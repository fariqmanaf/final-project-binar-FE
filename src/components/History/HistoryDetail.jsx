import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

const HistoryDetail = ({ data }) => {
  const countPassengers = (bookings) => {
    let adults = 0;
    let children = 0;
    let infants = 0;

    bookings.forEach((booking) => {
      if (booking.passenger.type === 'ADULT') {
        adults += 1;
      } else if (booking.passenger.type === 'CHILD') {
        children += 1;
      } else if (booking.passenger.type === 'INFANT') {
        infants += 1;
      }
    });

    return { adults, children, infants };
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', marginLeft: '2rem' }}>
      {data?.map((order) => {
        const passengerCount = countPassengers(order.bookings);
        return (
          <React.Fragment key={order.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Detail Pemesanan</h5>
              <span
                style={{
                  backgroundColor:
                    order.payment?.status === 'SUCCESS'
                      ? '#73CA5C'
                      : order.payment?.status === 'PENDING'
                        ? '#FF0000'
                        : '#8A8A8A',
                  color: 'white',
                  padding: '4px 12px',
                  fontSize: '12px',
                  borderRadius: '16px',
                }}
              >
                {order.payment?.status === 'SUCCESS'
                  ? 'Issued'
                  : order.payment?.status === 'PENDING'
                    ? 'Unpaid'
                    : 'Canceled'}
              </span>
            </div>
            <div style={{ marginTop: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>Booking Code:</p>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#7126B5' }}>{order.code}</span>
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '14px' }}>
                  {new Date(order.departureFlight?.departureTimestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#A06ECE' }}>Keberangkatan</p>
              </div>
              <p style={{ margin: 0, fontSize: '12px' }}>
                {new Date(order.departureFlight?.departureTimestamp).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p style={{ fontSize: '12px' }}>{order.departureFlight?.departureAirport?.name}</p>
            </div>
            <hr style={{ margin: '16px 0', borderColor: '#E0E0E0' }} />
            <div style={{ textAlign: 'left', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <img
                src={order.departureFlight?.airline?.image}
                alt="logo airline"
                style={{ maxWidth: '50px', height: 'auto', marginRight: '12px' }}
              />
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                  {order.departureFlight?.airline?.name}
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>{order.departureFlight?.flightNumber}</p>
              </div>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px' }}>
                Informasi:
              </p>
              {order.bookings?.map((booking) => (
                <p key={booking.id} style={{ margin: 0, fontSize: '12px' }}>
                  Penumpang: <span style={{ color: '#7126B5', fontWeight: 'bold' }}>{booking.passenger.name}</span>
                  <br />
                  ID: {booking.passenger.id}
                </p>
              ))}
            </div>
            <hr style={{ margin: '16px 0', borderColor: '#E0E0E0' }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

HistoryDetail.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HistoryDetail;
