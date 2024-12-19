// import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { FaBaby, FaChild, FaUser } from 'react-icons/fa';

const PassengerDialog = ({ onSelectCounts, onClose }) => {
  const [counts, setCounts] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const handleCountChange = (type, operation) => {
    setCounts((prevCounts) => {
      const newCount = operation === 'increment' ? prevCounts[type] + 1 : Math.max(0, prevCounts[type] - 1);
      return { ...prevCounts, [type]: newCount };
    });
  };

  const categoryIcons = {
    adult: FaUser,
    child: FaChild,
    infant: FaBaby,
  };

  const handleSave = () => {
    onSelectCounts(counts);
    onClose();
  };
  return (
    
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]">
        <div className="flex items-center justify-end pb-2">
          <button
            className="text-gray-600 hover:text-gray-800 text-xl font-bold"
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <hr className="mb-4 border-gray-300 border-[1.5px]" />
        {['adult', 'child', 'infant'].map((type, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-300">
            <div className="flex items-center gap-3">
              {categoryIcons[type]({ className: 'text-xl' })}
              <div>
                <div className="font-bold">
                  {type === 'adult' && 'Dewasa'}
                  {type === 'child' && 'Anak'}
                  {type === 'infant' && 'Bayi'}
                </div>
                <div className="text-sm text-gray-500">
                  {type === 'adult' && '(12 tahun ke atas)'}
                  {type === 'child' && '(2 - 11 tahun)'}
                  {type === 'infant' && '(Di bawah 2 tahun)'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border border-purple-500 text-purple-500 rounded w-8 h-8 flex items-center justify-center"
                onClick={() => onCountChange(type, 'decrement')}
              >
                -
              </button>
              <span className="border px-4 py-1 rounded text-center">{counts[type]}</span>
              <button
                className="border border-purple-500 text-purple-500 rounded w-8 h-8 flex items-center justify-center"
                onClick={() => onCountChange(type, 'increment')}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button onClick={handleSave} className="bg-purple-600 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </div>
      </div>
    
  );
};

export default PassengerDialog;
