import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeatGrid.css";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const SeatGrid = ({ performanceId, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 🔧 좌석 상태 수동 새로고침 트리거
  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get(`${API_BASE_URL}/seat/status/${performanceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setSeats(res.data);
      })
      .catch((err) => {
        console.error("좌석 정보를 로드하는 데 실패했습니다.", err);
      });
  }, [performanceId, refreshTrigger]);

  useEffect(() => {
    onSeatSelect(selectedSeatIds);
  }, [selectedSeatIds, onSeatSelect]);

  const handleSeatClick = (seatId) => {
    setSelectedSeatIds((prev) => (prev.includes(seatId) ? [] : [seatId]));
  };

  const handleClick = (seatId, seatStatus) => {
    if (seatStatus !== "AVAILABLE") return;
    handleSeatClick(seatId);
  };

  const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];

  return (
    <div className="grid-wrapper">
      {sections.map((section) => {
        const blockSeats = seats.filter(seat => seat.seatSection === section);
        const seatNumbers = blockSeats.map(s => parseInt(s.seatNum)).filter(n => !isNaN(n));
        const maxSeatNumber = seatNumbers.length > 0 ? Math.max(...seatNumbers) : 0;
        const numRows = Math.ceil(maxSeatNumber / 10);

        return (
          <div key={section} className="seat-block">
            {[...Array(numRows || 1)].map((_, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {[...Array(10)].map((_, colIndex) => {
                  const seatNumber = rowIndex * 10 + colIndex + 1;
                  const seat = blockSeats.find(
                    (s) => s.seatNum === seatNumber.toString().padStart(2, "0")
                  );

                  if (!seat) {
                    return <button key={colIndex} className="seat empty" />;
                  }

                  const seatStatus = seat.seatStatus?.toUpperCase();
                  const isSelected = selectedSeatIds.includes(seat.seatId);

                  return (
                    <button
                      key={seat.seatId}
                      className={`seat ${isSelected ? "selected" : ""} ${seatStatus === "BOOKED" ? "booked" : ""} ${seatStatus === "HOLD" ? "hold" : ""}`}
                      onClick={() => handleClick(seat.seatId, seatStatus)}
                    >
                      {seat.seatSection}
                      {seat.seatNum}
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
