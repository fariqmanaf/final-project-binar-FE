import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaCheckCircle } from 'react-icons/fa';

const SeatClassDialog = ({ onClose, onSelectClass }) => {
  const [selectedClass, setSelectedClass] = useState('Economy');

  const flightClasses = [
    { name: 'Economy', price: 'IDR 4.950.000' },
    { name: 'Premium Economy', price: 'IDR 7.550.000' },
    { name: 'Business', price: 'IDR 29.220.000' },
    { name: 'First Class', price: 'IDR 87.620.000' },
  ];

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
        {flightClasses.map((flightClass) => (
          <div
            key={flightClass.name}
            onClick={() => setSelectedClass(flightClass.name)}
            className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition-colors ${
              selectedClass === flightClass.name ? 'bg-[#5E2D91] text-white' : 'bg-white text-black'
            }`}
            style={{ borderBottom: '1px solid #ddd' }}
          >
            <div className="w-3/4">
              <div
                className={`${selectedClass === flightClass.name ? 'font-bold text-white' : 'font-normal text-black'}`}
              >
                {flightClass.name}
              </div>
              <div className="text-sm">
                <span className={`${selectedClass === flightClass.name ? 'text-white' : 'text-[#7126B5]'}`}>
                  {flightClass.price}
                </span>
              </div>
            </div>
            {selectedClass === flightClass.name && <FaCheckCircle size={20} color="#28a745" />}
          </div>
        ))}
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
