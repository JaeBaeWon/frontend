import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowInfo.css';

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const ShowInfo = ({ performId }) => {
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    // API 호출하여 공연 정보 가져오기
    axios.get(`${API_BASE_URL}/performance/${performId}`)
      .then((response) => {
        setPerformance(response.data); // 공연 정보 상태에 저장
      })
      .catch((error) => {
        console.error("공연 정보를 로드하는 데 실패했습니다.", error);
      });
  }, [performId]); // performId가 5로 고정되어 있어, 의존성 배열에 performId를 추가

  // 공연 정보가 로드되기 전에 로딩 메시지를 표시
  if (!performance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="show-info">
      <h3>{performance.title}</h3>
      <p>가격: {performance.price.toLocaleString()}원</p>
      <p>매수: 1</p>

      <p className="selection-header">선택 내역</p>
      <p>날짜: {performance.performStartAt ? performance.performStartAt.split(' ')[0] : ''}</p>
      <p>시간: {performance.performStartAt ? performance.performStartAt.split(' ')[1].slice(0, 5) : ''} ~
              {performance.performEndAt ? performance.performEndAt.split(' ')[1].slice(0, 5) : ''}</p>
      <p>최종 결제 금액: {performance.price.toLocaleString()}원</p>
    </div>

  );
};

export default ShowInfo;