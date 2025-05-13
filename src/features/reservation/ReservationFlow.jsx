import React, { useState } from 'react';
import Header from "../../components/layout/Header";
import SequenceSelect from '../../components/reservation/SequenceSelect';
import SelectSeat from './SelectSeat';
import ShowInfo from '../../components/reservation/ShowInfo';
import CheckUserInfo from './CheckUserInfo';
import Payment from './Payment';
import ShowPayInfo from './ShowPayInfo';
import './Reservation.css';

const ReservationFlow = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1~4까지

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const [reservationId, setReservationId] = useState(null);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SelectSeat />;
      case 2:
        return <CheckUserInfo />;
      case 3:
        return <Payment setCurrentStep={setCurrentStep} setReservationId={setReservationId} />;
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
          <ShowInfo />
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