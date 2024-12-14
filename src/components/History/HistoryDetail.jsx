import PropTypes from 'prop-types';
import { Button } from '../ui/button';

const HistoryDetail = ({ data }) => {
  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', marginLeft: '2rem' }}>
      {data?.map((order) => (
        <>
          <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Detail Pemesanan</h5>
            <span
              style={{
                backgroundColor:
                  order.payment?.status === 'SUCCESS'
                    ? '#73CA5C'
                    : order.payment?.status === 'FAILED'
                      ? '#FF0000'
                      : '#8A8A8A',
                color: 'white',
                padding: '4px 12px',
                fontSize: '12px',
                borderRadius: '16px',
              }}
            >
              {order.payment?.status}
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
              {new Date(order.departureFlight?.departureTimestamp).toLocaleDateString()}
            </p>
            <p style={{ fontSize: '12px' }}>{order.departureFlight?.departureAirport.name}</p>
          </div>

          <hr style={{ margin: '16px 0', borderColor: '#E0E0E0' }} />

          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <img
              src={order.departureFlight?.airline.image}
              alt="logo airline"
              style={{ maxWidth: '100px', height: 'auto' }}
            />
          </div>

          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{order.departureFlight?.airline.name}</p>
            <p style={{ margin: 0, fontSize: '14px' }}>{order.departureFlight?.flightNumber}</p>
            <p style={{ marginTop: '16px', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Informasi:</p>
            {order.bookings?.map((booking, index) => (
              <p key={index} style={{ margin: 0, fontSize: '12px' }}>
                Penumpang {index + 1}:{' '}
                <span style={{ color: '#7126B5', fontWeight: 'bold' }}>{booking.passenger.name}</span>
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
              {new Date(order.departureFlight?.arrivalTimestamp).toLocaleDateString()}
            </p>
            <p style={{ fontSize: '12px' }}>{order.departureFlight?.destinationAirport.name}</p>
          </div>

          <hr style={{ margin: '16px 0', borderColor: '#E0E0E0' }} />

          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Rincian Harga</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <p style={{ margin: 0 }}>1 Adult</p>
              <p style={{ margin: 0 }}>Rp {order.departureFlight?.price.toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <p style={{ margin: 0 }}>Tax</p>
              <p style={{ margin: 0 }}>Rp {order.payment?.amount * 0.1}</p>
            </div>
            <hr style={{ margin: '16px 0', borderColor: '#E0E0E0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '14px' }}>Total</strong>
              <strong style={{ fontSize: '16px', color: '#7126B5' }}>Rp {order.payment?.amount.toLocaleString()}</strong>
            </div>
          </div>

          <Button
            style={{
              marginTop: '16px',
              width: '100%',
              backgroundColor:
                order.payment?.status === 'SUCCESS'
                  ? '#7126B5'
                  : order.payment?.status === 'FAILED'
                    ? '#FF0000'
                    : '#95A5A6',
              borderColor:
                order.payment?.status === 'SUCCESS'
                  ? '#9B59B6'
                  : order.payment?.status === 'FAILED'
                    ? '#E74C3C'
                    : '#95A5A6',
              color: 'white',
            }}
            onClick={() => {
              if (order.payment?.status === 'FAILED') {
                window.location.href = order.payment.snapRedirectUrl; // Redirect to payment page
              } else if (order.payment?.status === 'SUCCESS') {
                alert('Cetak Tiket');
              }
            }}
          >
            {order.payment?.status === 'SUCCESS'
              ? 'Cetak Tiket'
              : order.payment?.status === 'FAILED'
                ? 'Lanjut Bayar'
                : 'Canceled'}
          </Button>
        </>
      ))}
    </div>
  );
};

HistoryDetail.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      payment: PropTypes.shape({
        status: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        snapRedirectUrl: PropTypes.string,
      }).isRequired,
      bookings: PropTypes.arrayOf(
        PropTypes.shape({
          passenger: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      departureFlight: PropTypes.shape({
        airline: PropTypes.shape({
          name: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
        }).isRequired,
        flightNumber: PropTypes.string.isRequired,
        departureTimestamp: PropTypes.string.isRequired,
        arrivalTimestamp: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        departureAirport: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        destinationAirport: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default HistoryDetail;
