import React, { useState } from 'react';
import Header from "../../components/layout/Header";
import SequenceSelect from '../../components/reservation/SequenceSelect';
import SeatGrid from './SeatGrid';
import ShowInfo from '../../components/reservation/ShowInfo';
import './CheckUserInfo.css';

const CheckUserInfo = () => {

  return (
      <div className="check-info-container">
        <div className="order-info">
          <h3>주문자 정보</h3>
          <p><strong>이름</strong> 띠로리</p>
          <p><strong>연락처</strong> 010-1234-5678</p>
          <p><strong>이메일</strong> leeee@naver.com</p>

          <h3>배송지 정보</h3>
          <div className="delivery-tag">이</div>
          <p>서울시 무슨구 어쩌고<br />무슨아파트 1동 101호</p>

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
