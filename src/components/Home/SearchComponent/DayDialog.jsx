import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DayDialog = ({ onSelectDate, onClose }) => {
  const [selectedDay, setSelectedDay] = useState();

  const handleDateSelect = (date) => {
    setSelectedDay(date);
    onSelectDate(date, 'start'); // Mengirimkan tanggal yang dipilih ke komponen induk
    onClose(); // Menutup popover setelah memilih tanggal
  };

  return (
    <div className="p-4 bg-white border rounded-md shadow-lg">
      <DayPicker selected={selectedDay} onDayClick={handleDateSelect} />
    </div>
  );
};

export default DayDialog;
