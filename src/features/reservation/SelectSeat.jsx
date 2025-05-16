import React, { useState } from 'react';
import SeatGrid from './SeatGrid';

const SelectSeat = ({ performanceId, onSelectedSeatsChange }) => {
  const handleSeatSelect = (selectedSeats) => {
    onSelectedSeatsChange(selectedSeats);
  };

  return (
    <div>
      <SeatGrid performanceId={performanceId} onSeatSelect={handleSeatSelect} />
    </div>
  );
};

export default SelectSeat;