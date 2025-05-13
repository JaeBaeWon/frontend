import React, { useState } from 'react';
import SeatGrid from './SeatGrid';

const SelectSeat = ({ onSelectedSeatsChange }) => {
  const performanceId = 5;

  const handleSeatSelect = (selectedSeats) => {
    onSelectedSeatsChange(selectedSeats); // ⬅️ 부모에게 전달
  };

  return (
    <div>
      <SeatGrid performanceId={performanceId} onSeatSelect={handleSeatSelect} />
    </div>
  );
};

export default SelectSeat;
