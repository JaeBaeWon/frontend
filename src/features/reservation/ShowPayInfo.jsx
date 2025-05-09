import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import './ShowPayInfo.css';

const ShowPayInfo = () => {
  const navigate = useNavigate(); // ✅ 훅 사용

  return (
    <div className="payment-complete-container">
      <h2 className="payment-complete-title">결제가 완료되었습니다.</h2>

      <div className="payment-info-sections">
        <div className="info-block">
          <h4>예매 정보</h4>
          <p><strong>티켓번호</strong> LHJ0221LHJL21</p>
          <p><strong>공연정보</strong><br />
            지킬 앤 하이드<br />
            코엑스<br />
            2025.02.30 오후 3시
          </p>
          <p><strong>좌석정보</strong> A구역 221번</p>
        </div>

        <div className="info-block">
          <h4>결제 정보</h4>
          <p><strong>결제 금액</strong> 150,000</p>
          <p><strong>결제 방식</strong> 신용카드(하나)</p>
          <p><strong>결제 시간</strong> 2025.01.30 23:25:30</p>
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
