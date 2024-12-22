import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DetailFlight } from '@/components/PassengerForm/detail-flight';
import { motion } from 'motion/react';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { mapping } from '@/utils/mappingClass';

export const AccordionFlight = ({ flight, RD, DF, DD, A, C, I }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleRedirect = (item) => {
    if (RD !== null) {
      navigate({
        search: {
          DD: RD.toISOString().split('T')[0],
          AA: item?.departureAirport?.id,
          DA: item?.destinationAirport?.id,
          DF: item?.id,
          PD: DD.toISOString().split('T')[0],
          A: A,
          C: C,
          I: I,
        },
      });
    }
    if (DF !== null) {
      token
        ? navigate({
            to: `/checkout/${DF}?returnId=${item?.id}&${A ? `A=${A}&` : ''}${C ? `C=${C}&` : ''}${I ? `I=${I}&` : ''}`,
          })
        : toast.error('Silahkan login terlebih dahulu');
    }
    if (RD === null && DF === null) {
      token
        ? navigate({
            to: `/checkout/${item?.id}?${A ? `A=${A}&` : ''}${C ? `C=${C}&` : ''}${I ? `I=${I}&` : ''}`,
          })
        : toast.error('Silahkan login terlebih dahulu');
    }
  };

  return flight.map((item, index) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      key={index}
      className="w-full"
    >
      <Accordion
        type="single"
        collapsible
        className="shadow-lg border rounded-xl px-[1rem] py-[1rem] md:px-[2rem] md:py-[2rem]"
      >
        <AccordionItem value={`item-${index + 1}`}>
          <AccordionTrigger>
            <div className="flex justify-between items-center w-full pr-[2rem] gap-[2rem]">
              <div className="flex flex-col w-[80%]">
                <div className="flex gap-[1rem] text-sm font-normal items-center mb-[1rem]">
                  <img src={item?.airline?.image} className="w-[3rem]" />
                  <p className="md:text-sm text-xs">
                    {item?.airline?.name} - {mapping[item?.type]}
                  </p>
                </div>
                <div className="flex gap-[2rem] text-sm pr-[1rem] w-full">
                  <div className="DepartureTime flex flex-col justify-center items-center">
                    <p className="font-semibold">
                      {item?.departureTimestamp
                        ? new Date(item?.departureTimestamp).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </p>
                    <p>{item?.departureAirport?.code}</p>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center gap-[0.5rem]">
                    <p className="text-slate-400 font-light text-xs md:text-sm">
                      {item?.departureTimestamp && item?.arrivalTimestamp
                        ? (() => {
                            const departure = new Date(item.departureTimestamp);
                            const arrival = new Date(item.arrivalTimestamp);
                            const durationMs = arrival - departure;
                            const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
                            const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                            return `${durationHours}h ${durationMinutes}m`;
                          })()
                        : 'N/A'}
                    </p>
                    <hr className="w-full" />
                    <p className="text-slate-400 font-light">Direct</p>
                  </div>
                  <div className="arrivalTime  flex flex-col justify-center items-center">
                    <p className="font-semibold">
                      {item?.arrivalTimestamp
                        ? new Date(item?.arrivalTimestamp).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </p>
                    <p>{item?.destinationAirport?.code}</p>
                  </div>
                  <img src="/baggage-delay.svg" className="w-[2rem]" />
                </div>
              </div>
              <div className="flex flex-col gap-[1rem]">
                <p className="text-sm text-[#7126B5] font-semibold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item?.price)}
                </p>
                <div
                  className="bg-[#7126B5] hover:bg-[#A06ECE] rounded-full text-white px-[2vw] py-[1vh]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRedirect(item);
                  }}
                >
                  Pilih
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-[2vh] w-full transition-all duration-300 ease-in-out">
            <hr className="w-full mb-[2vh]" />
            <DetailFlight data={item} className="border-0 shadow-none" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  ));
};
