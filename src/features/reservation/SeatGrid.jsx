import React, { useState } from 'react';
import './SeatGrid.css';

const SeatGrid = () => {
  const blockCount = 6; // 6개 블럭
  const rowsPerBlock = 10;
  const colsPerBlock = 10;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (block, row, col) => {
    const seatId = `B${block}-R${row}-C${col}`;
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="grid-wrapper">
      {[...Array(blockCount)].map((_, blockIndex) => (
        <div key={blockIndex} className="seat-block">
          {[...Array(rowsPerBlock)].map((_, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {[...Array(colsPerBlock)].map((_, colIndex) => {
                const seatId = `B${blockIndex}-R${rowIndex}-C${colIndex}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <button
                    key={colIndex}
                    className={`seat ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSeatClick(blockIndex, rowIndex, colIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;
