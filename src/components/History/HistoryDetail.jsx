import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import React from 'react';

const HistoryDetail = ({ data }) => {
  // Function to count passengers based on type
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
            <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                style={{ maxWidth: '50px', height: 'auto', marginRight: '12px' }} // Ukuran gambar lebih kecil dan margin kanan untuk jarak
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
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '14px' }}>
                  {new Date(order.departureFlight?.arrivalTimestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#A06ECE' }}>Kedatangan</p>
              </div>
              <p style={{ margin: 0, fontSize: '12px' }}>
                {new Date(order.departureFlight?.arrivalTimestamp).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {/* Ensure returnFlight is not null before trying to access properties */}
              <p style={{ fontSize: '12px' }}>{order.returnFlight?.destinationAirport?.name || 'N/A'}</p>
            </div>
            <hr style={{ margin: '16px 0', borderColor: '#E0E0E0' }} />
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Rincian Harga</p>
              {/* Menampilkan jumlah Dewasa */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <p style={{ margin: 0 }}>{passengerCount.adults} Dewasa</p>
                <p style={{ margin: 0 }}>
                  {formatRupiah(
                    order.departureFlight.price * passengerCount.adults +
                      (order.returnFlight?.price || 0) * passengerCount.adults
                  )}
                </p>
              </div>
              {/* Menampilkan jumlah Anak */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <p style={{ margin: 0 }}>{passengerCount.children} Anak</p>
                <p style={{ margin: 0 }}>
                  {formatRupiah(
                    order.departureFlight.price * passengerCount.children +
                      (order.returnFlight?.price || 0) * passengerCount.children
                  )}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <p style={{ margin: 0 }}>{passengerCount.infants} Bayi</p>
                <p style={{ margin: 0 }}>Rp 0,00</p>
              </div>
              {/* Menghitung pajak */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <p style={{ margin: 0 }}>Tax</p>
                <p style={{ margin: 0 }}>
                  {formatRupiah(
                    order.payment?.amount -
                      (order.departureFlight.price * passengerCount.adults +
                        (order.returnFlight?.price || 0) * passengerCount.adults +
                        order.departureFlight.price * passengerCount.children +
                        (order.returnFlight?.price || 0) * passengerCount.children)
                  )}
                </p>
              </div>
              <hr style={{ margin: '16px 0', borderColor: '#E0E0E0' }} />
              {/* Menampilkan Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '14px' }}>Total</strong>
                <strong style={{ fontSize: '16px', color: '#7126B5' }}>
                  {formatRupiah(order.payment.amount)} {/* Total harga dari payment.amount */}
                </strong>
              </div>
            </div>
            <Button
              style={{
                marginTop: '16px',
                width: '100%',
                backgroundColor:
                  order.payment.status === 'PENDING'
                    ? '#FF0000'
                    : order.payment.status === 'SUCCESS'
                      ? '#73CA5C'
                      : '#95A5A6',
                borderColor:
                  order.payment.status === 'PENDING'
                    ? '#E74C3C'
                    : order.payment.status === 'SUCCESS'
                      ? '#27AE60'
                      : '#95A5A6',
                color: 'white',
              }}
              disabled={order.payment.status === 'CANCELED'}
            >
              {order.payment.status === 'PENDING' ? (
                <Link to="/payment/$tokenBayar" style={{ color: 'white', textDecoration: 'none' }}>
                  Lanjut Bayar
                </Link>
              ) : order.payment.status === 'SUCCESS' ? (
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  Cetak Tiket
                </Link>
              ) : (
                'Canceled'
              )}
            </Button>
            <hr style={{ marginTop: '16px', borderColor: '#E0E0E0' }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

HistoryDetail.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      payment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        method: PropTypes.string,
        expiredAt: PropTypes.string.isRequired,
        snapToken: PropTypes.string.isRequired,
        snapRedirectUrl: PropTypes.string.isRequired,
      }).isRequired,
      bookings: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          passenger: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      departureFlight: PropTypes.shape({
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        airline: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
        }).isRequired,
        flightNumber: PropTypes.string.isRequired,
        departureAirport: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        departureTimestamp: PropTypes.string.isRequired,
      }).isRequired,
      returnFlight: PropTypes.shape({
        id: PropTypes.string, // Make returnFlight optional by removing .isRequired
        price: PropTypes.number,
      }), // Return flight is optional, it can be null or missing
    })
  ).isRequired,
};

export default HistoryDetail;
