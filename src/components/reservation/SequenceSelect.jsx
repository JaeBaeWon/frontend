import React from 'react';
import './SequenceSelect.css';

const SequenceSelect = ({ currentStep }) => {
  const steps = ['날짜 / 회차 선택', '좌석 선택', '주문자 정보 확인', '결제 정보 입력', '결제 완료'];

  return (
    <div className="sequence-select">
      {steps.map((step, index) => (
        <div key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default SequenceSelect;
