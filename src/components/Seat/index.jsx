import { Button } from '../ui/button';
import React from 'react';

export function Seat({ seats, handleSeatSelection, selectedSeats, maxCol }) {
  const effectiveColumns = maxCol + 1;

  const gridColumnClass =
    {
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    }[effectiveColumns] || 'grid-cols-5';

  const selectedSeatLabels = selectedSeats.reduce((acc, seat, index) => {
    acc[seat.id] = `P${index + 1}`;
    return acc;
  }, {});

  return (
    <div className="md:px-[5rem]">
      <div className="flex flex-row gap-2 justify-center items-center mb-[4vh]">
        <div className="bg-green-500 p-2 w-[1rem] h-[1rem]"></div>
        <p className="text-gray-500 text-sm mr-[1vw]">Tersedia</p>
        <div className="bg-gray-300 p-2 w-[1rem] h-[1rem]"></div>
        <p className="text-gray-500 text-sm mr-[1vw]">Tidak Tersedia</p>
        <div className="bg-purple-500 p-2 w-[1rem] h-[1rem]"></div>
        <p className="text-gray-500 text-sm">Pilihanmu</p>
      </div>
      <div className={`grid ${gridColumnClass} gap-4`}>
        {Array.from({ length: effectiveColumns }, (_, index) => {
          if (index === maxCol / 2) {
            return <div key={`header-gap-${index}`} className="col-span-1"></div>;
          }

          if (index < effectiveColumns) {
            const column = String.fromCharCode(65 + (index > maxCol / 2 ? index - 1 : index));
            return (
              <div key={index} className="text-center font-light text-sm text-slate-400 mb-[3vh]">
                {column}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className={`grid grid-cols-${effectiveColumns} gap-4`}>
        {seats.map((seat, index) => {
          const isGap = index % maxCol === maxCol / 2;
          const gapIndex = Math.floor(index / maxCol) + 1;
          const seatLabel = `${Math.floor(index / maxCol) + 1}${String.fromCharCode(65 + (index % maxCol))}`;

          return (
            <React.Fragment key={seat.id}>
              {isGap && (
                <div
                  key={`gap-${index}`}
                  className="col-span-1 flex justify-center items-center text-white text-sm rounded-lg bg-slate-400"
                >
                  {gapIndex}
                </div>
              )}
              <Button
                type="button"
                key={seat.id}
                disabled={seat.status !== 'AVAILABLE'}
                onClick={() => handleSeatSelection(seat)}
                className={`${
                  seat.status === 'AVAILABLE'
                    ? selectedSeats.find((s) => s.id === seat.id)
                      ? 'bg-purple-500'
                      : 'bg-green-500'
                    : 'bg-gray-300 cursor-not-allowed'
                } text-white rounded-md p-2 hover:bg-slate-500`}
              >
                {seat.status !== 'AVAILABLE' ? 'X' : selectedSeatLabels[seat.id] || seatLabel}
              </Button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
