import { TimeStampConverter } from '@/utils/timestampConvert';
import { mappingPassenger } from '@/utils/mappingClass';

export function DetailFlight({ data, returnData, className }) {
  const timestamp = TimeStampConverter(data?.departureTimestamp, data?.arrivalTimestamp);

  return (
    <div className={`${className} flex flex-col p-[1.5rem] border border-slate-200 rounded-lg shadow-md`}>
      <div className="flex flex-col mb-[1rem]">
        <p className="text-xl font-semibold mb-[1rem]">Detail Penerbangan {returnData && '- Return'}</p>
        <div className="flex flex-row justify-between">
          <p className="font-semibold">{timestamp.departureTime}</p>
          <p className="text-[#7126B5] font-semibold text-[0.9rem]">Keberangkatan</p>
        </div>
        <p className="text-sm">{timestamp.departureDate}</p>
        <p className="font-medium text-sm">
          {data?.departureAirport.name} - {data?.departureAirport.type}
        </p>
      </div>
      <hr />
      <div className="flex flex-row gap-5 mt-[1rem] mb-[1rem]">
        <div className="flex flex-col justify-center items-center">
          <img src={data?.airline.image} alt="airplane" className="w-[5vw] h-auto" />
        </div>
        <div>
          <p className="font-semibold">{data?.airline.name}</p>
          <p className="font-semibold mb-[1rem]">{data?.flightNumber}</p>
          <p className="font-semibold">Informasi: </p>
          <p className="text-sm">Bagasi 7Kg</p>
          <p className="text-sm">Fasilitas Nyaman</p>
          <p className="text-sm">Hidangan Gratis</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-1 mt-[2vh]">
        <div className="flex flex-row justify-between">
          <p className="font-semibold">{timestamp.arrivalTime}</p>
          <p className="text-[#7126B5] font-semibold text-[0.9rem]">Kedatangan</p>
        </div>
        <p className="text-sm">{timestamp.arrivalDate}</p>
        <p className="font-medium text-sm">{data?.destinationAirport.name}</p>{' '}
      </div>
    </div>
  );
}

export function Pricing({ data, passenger }) {
  const passengerWithoutInfant = passenger.filter((passengerType) => passengerType.type !== 'INFANT');
  const totalPrice = data?.departureFlight?.price + (data?.returnFlight?.price ?? 0);

  return (
    <div className="flex flex-col p-[1.5rem] border border-slate-200 rounded-lg shadow-md mb-[2rem]">
      <p className="text-xl font-semibold mb-[1rem]">Rincian Harga</p>
      <div className="text-sm flex mb-[1rem] gap-4 font-semibold text-[#7126B5]">
        <p>(D) Departure</p>
        {data?.returnFlight && <p> (R) Return </p>}
      </div>
      <div className="flex flex-col gap-2">
        {passenger.map(
          (passengerType) =>
            passengerType.quantity > 0 && (
              <div className="flex justify-between" key={passengerType.type}>
                <p>
                  {passengerType.quantity} {mappingPassenger[passengerType.type]}
                </p>
                <div>
                  <p>
                    <span className="mr-[0.5rem] text-[#7126B5] font-semibold text-sm">(D)</span>
                    {passengerType.type === 'INFANT'
                      ? 'Rp. 0'
                      : `${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.departureFlight?.price)}`}
                  </p>
                  {data?.returnFlight && (
                    <p>
                      <span className="mr-[0.5rem] text-[#7126B5] font-semibold text-sm">(R)</span>
                      {passengerType.type === 'INFANT'
                        ? 'Rp. 0'
                        : `${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.returnFlight?.price)}`}
                    </p>
                  )}
                </div>
              </div>
            )
        )}
      </div>
      <hr className="my-[1rem]" />
      <div className="flex flex-row justify-between">
        <p>Total</p>
        {passengerWithoutInfant.length > 0 && (
          <p className="text-[#7126B5] font-semibold">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              totalPrice * passengerWithoutInfant.reduce((acc, curr) => acc + curr.quantity, 0)
            )}
          </p>
        )}
      </div>
    </div>
  );
}
