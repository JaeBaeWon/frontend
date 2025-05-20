import React, { useState, useEffect } from 'react';
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

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const ReservationFlow = () => {
  const location = useLocation();
  const performId = location.state?.performId;

  console.log("넘겨받은 performId:", performId);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await axios.get("/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("✅ 사용자 정보:", res.data.member);
        setUser(res.data.member);
      } catch (err) {
        console.error("❌ 사용자 정보 가져오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  const [currentStep, setCurrentStep] = useState(1); // 1~4까지
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const token = localStorage.getItem("accessToken");
      try {
        for (const seatId of selectedSeatIds) {
          const res = await axios.post(`${API_BASE_URL}/seat/try/${seatId}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          console.log(`좌석 ${seatId} 선점 성공:`, res.data);
        }

        setCurrentStep(currentStep + 1);
      } catch (err) {
        console.error("좌석 선점 실패:", err.response?.data || err.message);
        alert("선택하신 좌석이 이미 선점되었습니다. 다시 선택해주세요.");
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
            user={user}
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