import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/layout/Header";
import SequenceSelect from '../../components/reservation/SequenceSelect';
import SelectSeat from './SelectSeat';
import ShowInfo from '../../components/reservation/ShowInfo';
import CheckUserInfo from './CheckUserInfo';
import Payment from './Payment';
import ShowPayInfo from './ShowPayInfo';
import './Reservation.css';

const ReservationFlow = () => {
  const location = useLocation();
  const performId = location.state?.performId;

  console.log("넘겨받은 performId:", performId);

  const [currentStep, setCurrentStep] = useState(1); // 1~4까지
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  const handleNext = async () => {
      if (currentStep === 1) {
        try {
          for (const seatId of selectedSeatIds) {
            const res = await axios.post(`http://localhost:8080/seats/try/${seatId}`);
            console.log(`좌석 ${seatId} 선점 성공:`, res.data);
          }

          setCurrentStep(currentStep + 1);
        } catch (err) {
          console.error("좌석 선점 실패:", err.response?.data || err.message);
          alert("선택하신 좌석이 이미 선점되었습니다. 다시 선택해주세요.");
          return;
        }
      } else {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
      }
    };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const [reservationId, setReservationId] = useState(null);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SelectSeat
                    performanceId={performId}
                    onSelectedSeatsChange={setSelectedSeatIds} />;
      case 2:
        return <CheckUserInfo />;
      case 3:
        return (
          <Payment
            setCurrentStep={setCurrentStep}
            setReservationId={setReservationId}
            selectedSeatIds={selectedSeatIds}
            performId={performId}
          />
        );
      case 4:
        return <ShowPayInfo reservationId={reservationId} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="select-seat-page">
        <div className="left-section">
          <SequenceSelect currentStep={currentStep} />
          {renderStepContent()}

        </div>

        <div className="right-section">
          <ShowInfo performId={performId} />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                      {currentStep > 1 && (
                        <button className="next-button" onClick={handlePrev}>이전</button>
                      )}
                      {currentStep < 3 && (
                        <button className="next-button" onClick={handleNext}>다음</button>
                      )}
                    </div>
        </div>
      </div>
    </div>


  );
};

export default ReservationFlow;