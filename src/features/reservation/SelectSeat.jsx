import React, { useState } from 'react';
import SeatGrid from './SeatGrid';
import './Reservation.css';

const SelectSeat = () => {
    const performanceId = 5;

  return (
    <div>
        <SeatGrid performanceId={performanceId} />
    </div>
  );
};

export default SelectSeat;
