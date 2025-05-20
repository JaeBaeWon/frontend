import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShowPayInfo.css';

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const ShowPayInfo = ({ reservationId }) => {
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (!reservationId) {
      alert('예약 ID가 없습니다.');
      navigate('/');
      return;
    }

    axios.get(`${API_BASE_URL}/payment/info/${reservationId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      withCredentials: true // ✅ 필요한 경우
    })
      .then((res) => {
        setPaymentInfo(res.data);
      })
      .catch((err) => {
        console.error('결제 정보 조회 실패:', err);
        alert('결제 정보 조회에 실패했습니다.');
        navigate('/');
      });
  }, [reservationId, navigate]);

  if (!paymentInfo) return <div>로딩 중...</div>;

  return (
    <div className="payment-complete-container">
      <h2 className="payment-complete-title">결제가 완료되었습니다.</h2>

      <div className="payment-info-sections">
        <div className="info-block">
          <h4>예매 정보</h4>
          <p><strong>티켓번호</strong> {paymentInfo.ticketNumber}</p>
          <p><strong>공연정보</strong><br />
            {paymentInfo.performanceTitle}<br />
            {paymentInfo.performanceLocation}<br />
            {paymentInfo.performanceDate}
          </p>
          <p><strong>좌석정보</strong> {paymentInfo.seatInfo}</p>
        </div>

        <div className="info-block">
          <h4>결제 정보</h4>
          <p><strong>결제 금액</strong> {paymentInfo.paymentAmount.toLocaleString()}원</p>
          <p><strong>결제 방식</strong> {paymentInfo.payType}</p>
          <p><strong>결제 시간</strong> {paymentInfo.paymentTime}</p>
        </div>
      </div>

      <div className="payment-complete-buttons">
        <button onClick={() => navigate('/mypage/reservations')}>예매내역 보기</button>
        <button onClick={() => navigate('/')}>메인페이지로 가기</button>
      </div>
    </div>
  );
};

export default ShowPayInfo;
