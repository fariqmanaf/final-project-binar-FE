import { mappingStatus, mapping } from '@/utils/mappingClass';
import { FaLocationDot } from 'react-icons/fa6';

export const HistoryItem = ({ data, className, active, setActive }) => {
  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item?.departureFlight?.departureTimestamp || item?.departureFlight?.arrivalTimestamp);
    const key = date ? `${date.getFullYear()}-${date.getMonth() + 1}` : 'Unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedData).map((key) => {
        const [year, month] = key.split('-');
        const monthNames = [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ];
        return (
          <div key={key} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {monthNames[month - 1]} {year}
            </h2>
            {groupedData[key].map((item, index) => (
              <div
                key={index}
                className={`${className} ${active === index && 'border-[#7126B5]'}  flex justify-between cursor-pointer hover:scale-[101%] transition duration-100 rounded-2xl w-full gap-[2vh] border p-[1.5rem] shadow-xl mb-[3vh]`}
                onClick={() => setActive(index)}
              >
                <div className="flex flex-col w-full">
                  <div
                    className={`${item?.payment?.status === 'SUCCESS' && 'bg-green-500'} ${item?.payment?.status === 'PENDING' && 'bg-red-500'} ${item?.payment?.status === 'FAILED' && 'bg-gray-500'} p-2 mb-[3vh] h-[2rem] w-[20%] rounded-full text-white flex justify-center items-center`}
                  >
                    {mappingStatus[item?.payment?.status]}
                  </div>
                  <div className="flex gap-[2vw] md:text-[1vw] text-[0.8rem] w-full">
                    <div className="DepartureTime flex flex-col justify-center items-center gap-1">
                      <FaLocationDot />
                      <p className="font-semibold text-center">{item?.departureFlight?.departureAirport?.city}</p>
                      <p className="text-center">
                        {item?.departureFlight?.departureTimestamp
                          ? new Date(item?.departureFlight?.departureTimestamp).toLocaleTimeString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-[1vh]">
                      <p className="text-slate-400 font-light">
                        {item?.departureFlight?.departureTimestamp && item?.departureFlight?.arrivalTimestamp
                          ? (() => {
                              const departure = new Date(item?.departureFlight?.departureTimestamp);
                              const arrival = new Date(item?.departureFlight?.arrivalTimestamp);
                              const durationMs = arrival - departure;
                              const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
                              const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                              return `${durationHours}h ${durationMinutes}m`;
                            })()
                          : 'N/A'}
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="arrivalTime flex flex-col justify-center items-center gap-1">
                      <FaLocationDot />
                      <p className="font-semibold text-center">{item?.departureFlight?.destinationAirport?.city}</p>
                      <p className="text-center">
                        {item?.departureFlight?.arrivalTimestamp
                          ? new Date(item?.departureFlight?.arrivalTimestamp).toLocaleTimeString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </p>
                    </div>
                  </div>
                  <hr className="my-[4vh]" />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-[0.9rem] font-semibold">Kode Booking:</p>
                      <p className="text-[0.9rem]">{item?.code}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[0.9rem] font-semibold">Class:</p>
                      <p className="text-[0.9rem]">{mapping[item?.departureFlight?.type]}</p>
                    </div>
                    <div className="flex flex-col gap-1 justify-center">
                      <p className="text-[0.9rem] text-[#7126B5] font-semibold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                          item?.payment?.amount
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
