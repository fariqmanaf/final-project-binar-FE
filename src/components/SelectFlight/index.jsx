import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

//coba test dummy
const dummyFlights = [
  {
    id: 1,
    airline: 'Garuda Indonesia',
    class: 'Economy',
    departure_time: '06:00',
    departure_date: '12/12/2024',
    departure_location: 'Soekarno-Hatta (CGK)',
    arrival_time: '08:30',
    arrival_date: '12/12/2024',
    arrival_location: 'Ngurah Rai (DPS)',
    duration: '2h 30m',
    flight_type: 'Direct',
    price: 'IDR 1,200,000',
    flight_number: 'GA123',
    baggage: '20kg',
    cabin_baggage: '7kg',
  },
  {
    id: 2,
    airline: 'Lion Air',
    class: 'Business',
    departure_time: '10:00',
    departure_date: '12/12/2024',
    departure_location: 'Soekarno-Hatta (CGK)',
    arrival_time: '12:30',
    arrival_date: '12/12/2024',
    arrival_location: 'Juanda (SUB)',
    duration: '2h 30m',
    flight_type: 'Direct',
    price: 'IDR 1,000,000',
    flight_number: 'JT456',
    baggage: '30kg',
    cabin_baggage: '7kg',
  },
];

export function SelectFlight() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFlights(dummyFlights);
      } catch (error) {
        setError('Gagal mengambil data penerbangan');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleSelectFlight = (flightId) => {
    navigate({
      to: '/checkout',
      params: { flightId },
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <span className="text-lg mb-2 text-[#8A8A8A]">Mencari penerbangan terbaik...</span>
        <img src="/Loadingflight_.svg" alt="Loading Flight" className="my-2" />
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full mb-4">
      {flights.map((flight) => (
        <AccordionItem value={`item-${flight.id}`} key={flight.id} className="group mb-4">
          <AccordionTrigger className="relative flex flex-col items-start p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors group-hover:border-[#A06ECE]">
            <div className="flex justify-between w-full items-center mb-4">
              <span className="font-semibold text-gray-800">
                {flight.airline} - {flight.class}
              </span>
            </div>
            <div className="flex justify-between w-full items-center mt-4 mb-4 px-4">
              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-gray-800">{flight.departure_time}</div>
                  <div className="text-sm text-gray-600">{flight.departure_location}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-gray-800">{flight.duration}</div>
                  <img src="/Arrow.svg" alt="Arrow" className="my-2" />
                  <div className="text-sm text-gray-600">{flight.flight_type}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-gray-800">{flight.arrival_time}</div>
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <span>{flight.arrival_location}</span>
                    <img src="/baggage-delay.svg" alt="Baggage Icon" className="w-8 h-8 ml-2 -mt-1" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-[#7126B5] font-bold">{flight.price}</h1>
                <Button
                  className="mt-2 bg-[#7126B5] text-base rounded-2xl hover:bg-[#5b1098] w-full"
                  onClick={() => handleSelectFlight(flight.id)}
                >
                  Pilih
                </Button>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="p-4 bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 transition-colors group-hover:border-[#A06ECE]">
            <h3 className="text-base mb-2 text-[#4B1979] font-bold">Detail Penerbangan</h3>
            <div className="px-4 py-2">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-base">{flight.departure_time}</span>
                <span className="text-[#A06ECE] text-sm text-right font-bold">Keberangkatan</span>
              </div>
              <div className="text-gray-600 mb-4">
                <span className="text-sm text-[#151515]">{flight.departure_date}</span>
                <br />
                <span className="text-base text-[#151515]">{flight.departure_location}</span>
              </div>
              <Separator orientation="horizontal" className="w-[328px] my-4 mx-auto h-0.5 bg-gray-300" />
              <div className="mb-2 mt-2">
                <span className="font-semibold">
                  {flight.airline} - {flight.class}
                </span>
                <br />
                <span className="font-semibold">{flight.flight_number}</span>
                <br />
                <span>Baggage {flight.baggage}</span>
                <br />
                <span>Cabin baggage {flight.cabin_baggage}</span>
                <br />
                <span>In Flight Entertainment</span>
                <br />
              </div>
            </div>
            <Separator orientation="horizontal" className="w-[328px] my-4 mx-auto h-0.5 bg-gray-300" />
            <div className="px-4 py-2">
              <div className="flex justify-between mb-2">
                <span className="font-bold">{flight.arrival_time}</span>
                <span className="text-[#A06ECE] text-sm text-right font-bold">Kedatangan</span>
              </div>
              <div className="text-gray-600">
                <span className="text-sm text-[#151515]">{flight.arrival_date}</span>
                <br />
                <span className="text-base text-[#151515]">{flight.arrival_location}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
