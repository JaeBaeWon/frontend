import React, { useState } from 'react';
import Header from "../../components/layout/Header";
import SequenceSelect from '../../components/reservation/SequenceSelect';
import SeatGrid from './SeatGrid';
import ShowInfo from '../../components/reservation/ShowInfo';
import './Reservation.css';

const SelectSeat = () => {

  return (
    <div>
          <SeatGrid />
    </div>
  );
};

export default SelectSeat;
