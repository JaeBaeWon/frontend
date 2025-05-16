import React, { useEffect, useState } from 'react';
import './CheckUserInfo.css';

const CheckUserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = 1;

    fetch(`http://localhost:8080/reservation/check/user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('사용자 정보를 불러오지 못했습니다.');
        }
        return response.json();
      })
      .then(data => setUser(data))
      .catch(error => {
        console.error('Error:', error);
        alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      });
  }, []);

  if (!user) {
    return <div className="check-info-container">로딩 중...</div>;
  }

  return (
      <div className="check-info-container">
        <div className="order-info">
          <h3>주문자 정보</h3>
          <p><strong>이름</strong> {user.username}</p>
          <p><strong>연락처</strong> {user.phone}</p>
          <p><strong>이메일</strong> {user.email}</p>

          <h3>배송지 정보</h3>
          <p> {user.address}<br />무슨아파트 1동 101호</p>

          <div className="notice-box">
            <h4>주의사항</h4>
            <ol>
              <li>부정확한 정보 입력으로 인한 문제 발생은 책임지지 않습니다.</li>
              <li>배송지 정보 및 연락처를 정확히 입력해주시기 바랍니다.</li>
              <li>배송지 정보는 티켓 배송 시작 전 마이페이지에서 수정하실 수 있습니다.</li>
              <li>분실된 티켓은 재발권되지 않습니다.</li>
            </ol>
          </div>
        </div>
      </div>
    );
};

export default CheckUserInfo;