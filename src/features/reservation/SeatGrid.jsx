import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeatGrid.css';

const SeatGrid = ({ performanceId, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/seats/status/${performanceId}`)
      .then((res) => {
        setSeats(res.data);
      })
      .catch((err) => {
        console.error("좌석 정보를 로드하는 데 실패했습니다.", err);
      });
  }, [performanceId]);

  // ✅ 상태가 바뀔 때만 부모에게 전달
    useEffect(() => {
      onSeatSelect(selectedSeatIds);
    }, [selectedSeatIds, onSeatSelect]);

    const handleSeatClick = (seatId) => {
      setSelectedSeatIds(prev =>
        prev.includes(seatId) ? [] : [seatId]
      );
    };

    const handleClick = (seatId, seatStatus) => {
      if (seatStatus !== 'AVAILABLE') return;
      handleSeatClick(seatId);
    };


  const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="grid-wrapper">
      {sections.map(section => {
        const blockSeats = seats.filter(seat => seat.seatSection === section);
        return (
          <div key={section} className="seat-block">
            {[...Array(10)].map((_, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {[...Array(10)].map((_, colIndex) => {

                  const seatNumber = rowIndex * 10 + colIndex + 1;
                  const seat = blockSeats.find(s => parseInt(s.seatNum) === seatNumber);
                  if (!seat) return <button key={rowIndex*10+colIndex} className="seat empty" />;

                  const isSelected = selectedSeatIds.includes(seat.seatId);
                  const seatStatus = seat.seatStatus;

                  return (
                    <button
                        key={seat.seatId}
                        className={`seat
                            ${isSelected ? 'selected' : ''}
                            ${seatStatus === 'BOOKED' ? 'booked' : ''}
                            ${seatStatus === 'HOLD' ? 'hold' : ''}
                        `}
                        onClick={() => handleClick(seat.seatId, seatStatus)}
                   >
                        {seat.seatSection}{seat.seatNum}
                   </button>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default SeatGrid;