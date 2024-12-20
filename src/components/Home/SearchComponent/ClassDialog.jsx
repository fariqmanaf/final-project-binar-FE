import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaCheckCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getFlightData } from '@/Services/home/flight';
import toast from 'react-hot-toast';

const SeatClassDialog = ({ onClose, onSelectClass, dept, dest, deptDate, retDate }) => {
  const [selectedClass, setSelectedClass] = useState();
  const [flightClassesData, setFlightClasses] = useState([]);

  useEffect(() => {
    if (!dept || !dest || !deptDate || !retDate) {
      const defaultFlightClasses = [
        { type: 'ECONOMY', price: 4950000 },
        { type: 'PREMIUM', price: 7550000 },
        { type: 'BUSINESS', price: 29220000 },
        { type: 'FIRST_CLASS', price: 87620000 },
      ];
      setFlightClasses(defaultFlightClasses);
    }
  }, [dept, dest, deptDate, retDate]);

  const {
    data: flightClasses,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({ queryKey: 'flightClasses', queryFn: () => getFlightData(dept, dest, deptDate, retDate) });

  useEffect(() => {
    if (isSuccess) {
      if (!dept || !dest || !deptDate) {
        const defaultFlightClasses = [
          { type: 'ECONOMY', price: 4950000 },
          { type: 'PREMIUM', price: 7550000 },
          { type: 'BUSINESS', price: 29220000 },
          { type: 'FIRST_CLASS', price: 87620000 },
        ];
        setFlightClasses(defaultFlightClasses);
      } else {
        const uniqueClasses = {};
        flightClasses.forEach((flightClass) => {
          if (!uniqueClasses[flightClass.type] || uniqueClasses[flightClass.type].price > flightClass.price) {
            uniqueClasses[flightClass.type] = flightClass;
          }
        });
        const sortedClasses = ['ECONOMY', 'PREMIUM', 'BUSINESS', 'FIRST_CLASS']
          .map((type) => uniqueClasses[type])
          .filter(Boolean);
        setFlightClasses(sortedClasses);
      }
    }
    if (isError) {
      toast.error('Failed to fetch flight classes');
    }
  }, [flightClasses, isSuccess, isError, dept, dest, deptDate]);

  const handleSave = () => {
    onSelectClass(selectedClass); // Kirim kelas yang dipilih ke komponen induk
    onClose(); // Tutup modal
  };

  return (
    <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
      <div className="flex items-center justify-end pb-2">
        <button className="text-gray-600 hover:text-gray-800 text-xl font-bold" aria-label="Close" onClick={onClose}>
          &times;
        </button>
      </div>

      {/* Modal content */}
      <div>
        {['ECONOMY', 'PREMIUM', 'BUSINESS', 'FIRST_CLASS'].map((type) => {
          const flightClass = flightClassesData.find((fc) => fc.type === type) || {
            type,
            price: { ECONOMY: 4950000, PREMIUM: 7550000, BUSINESS: 29220000, FIRST_CLASS: 87620000 }[type],
          };

          const displayType = {
            ECONOMY: 'Economy',
            PREMIUM: 'Premium Economy',
            BUSINESS: 'Business',
            FIRST_CLASS: 'First Class',
          }[flightClass.type];

          return (
            <div
              key={flightClass.type}
              onClick={() => setSelectedClass(flightClass.type)}
              className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition-colors ${
                selectedClass === flightClass.type ? 'bg-[#5E2D91] text-white' : 'bg-white text-black'
              }`}
              style={{ borderBottom: '1px solid #ddd' }}
            >
              <div className="w-3/4">
                <div
                  className={`${selectedClass === flightClass.type ? 'font-bold text-white' : 'font-normal text-black'}`}
                >
                  {displayType}
                </div>
                <div className="text-sm">
                  <span className={`${selectedClass === flightClass.type ? 'text-white' : 'text-[#7126B5]'}`}>
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(flightClass.price)}
                  </span>
                </div>
              </div>
              {selectedClass === flightClass.type && <FaCheckCircle size={20} color="#28a745" />}
            </div>
          );
        })}
      </div>

      {/* Save button */}
      <div className="text-center mt-4">
        <Button
          onClick={handleSave}
          className="bg-[#5E2D91] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#4A2371] focus:outline-none"
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default SeatClassDialog;
