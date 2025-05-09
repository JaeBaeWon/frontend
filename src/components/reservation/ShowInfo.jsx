// ShowInfo.js
import React from 'react';
import './ShowInfo.css';

const ShowInfo = () => {
  return (
    <div className="show-info">
      <h3>지킬 앤 하이드</h3>
      <p>가격: 150,000원</p>
      <p>매수: 1</p>
      <p>선택 내역</p>
      <p>날짜: 2025.01.20</p>
      <p>회차: 1차</p>
      <p>시간: 오후 3시</p>
      <p>좌석: A1, B2</p> {/* 예시로 좌석을 표시 */}
      <p>최종 결제 금액: 150,000원</p>
    </div>
  );
};

export default ShowInfo;
