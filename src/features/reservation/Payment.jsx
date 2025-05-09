import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [selectedPg, setSelectedPg] = useState('html5_inicis');
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    cancelPolicy: false,
    thirdParty: false,
  });

  const toggleAgreement = (key) => {
    setAgreements({ ...agreements, [key]: !agreements[key] });
  };

  const toggleAll = () => {
    const newValue = !agreeAll;
    setAgreeAll(newValue);
    setAgreements({
      terms: newValue,
      cancelPolicy: newValue,
      thirdParty: newValue,
    });
  };

  const onClickPayment = async () => {
    if (!window.IMP) return;
    const IMP = window.IMP;
    IMP.init("imp00577760");

    try {
      const reservationResponse = await fetch("http://localhost:8080/reservation/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          performanceId: 1,
          seatId: 1
        }),
      });

      if (!reservationResponse.ok) throw new Error("예약 생성 실패");
      const json = await reservationResponse.json();
      const reservationId = json.reservationId;

      const res = await fetch(`http://localhost:8080/reservation/check/reservation/${reservationId}`);
      const data = await res.json();

      IMP.request_pay(
        {
          pg: selectedPg,
          pay_method: selectedMethod,
          merchant_uid: "order_" + new Date().getTime(),
          name: data.title,
          amount: data.price,
          buyer_email: data.email,
          buyer_name: data.username,
          buyer_tel: data.phone
        },
        async function (rsp) {
          if (rsp.success) {
            alert(`✅ 결제 성공: imp_uid = ${rsp.imp_uid}`);

            try {
              const verifyResponse = await fetch("http://localhost:8080/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  impUid: rsp.imp_uid,
                  merchantUid: rsp.merchant_uid,
                  reservationId: reservationId
                }),
              });

              if (!verifyResponse.ok) throw new Error("검증 실패");
              alert("🎉 결제 검증 및 저장 성공!");
            } catch (error) {
              console.error("결제 검증 실패:", error);
              alert("❗ 결제는 되었지만 서버 저장 실패");
            }
          } else {
            alert(`❌ 결제 실패: ${rsp.error_msg}`);
          }
        }
      );
    } catch (error) {
      console.error("예약/결제 흐름 오류:", error);
      alert("예약 또는 결제 과정 중 오류 발생");
    }
  };

  return (
    <div className="payment-container">
      <h3>결제 방법 선택</h3>
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            name="pg"
            checked={selectedPg === 'html5_inicis'}
            onChange={() => setSelectedPg('html5_inicis')}
          />
          신용카드
        </label>
        <label>
          <input
            type="radio"
            name="pg"
            checked={selectedPg === 'kakaopay'}
            onChange={() => setSelectedPg('kakaopay')}
          />
          카카오페이
        </label>
      </div>

      <div className="refund-info">
        <div className="refund-deadline">
          <strong>취소 가능 마감 시간 : </strong>
          <span style={{ color: 'red' }}>2025년 06월 05일 17:00까지</span>
        </div>
        <table className="refund-table">
          <thead>
            <tr>
              <th>내용</th>
              <th>취소수수료</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>예매 후 7일 이내</td>
              <td>없음</td>
              <td>뮤지컬, 콘서트 등: 장당 4,000원</td>
            </tr>
            <tr>
              <td>예매 후 8~10일 경과까지</td>
              <td>티켓 금액의 10%</td>
              <td>연극 등: 장당 2,000원</td>
            </tr>
            <tr>
              <td>공연일 9일 전 ~ 7일 전까지</td>
              <td>티켓 금액의 10%</td>
              <td></td>
            </tr>
            <tr>
              <td>공연일 6일 전 ~ 3일 전까지</td>
              <td>티켓 금액의 20%</td>
              <td></td>
            </tr>
            <tr>
              <td>공연일 2일 전 ~ 1일 전까지</td>
              <td>티켓 금액의 30%</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="agreements">
        <label>
          <input type="checkbox" checked={agreeAll} onChange={toggleAll} />
          모두 동의합니다.
        </label>
        <label>
          <input type="checkbox" checked={agreements.terms} onChange={() => toggleAgreement('terms')} />
          개인정보 수집 및 이용에 동의합니다.
        </label>
        <label>
          <input type="checkbox" checked={agreements.cancelPolicy} onChange={() => toggleAgreement('cancelPolicy')} />
          취소수수료 및 취소기한을 확인했으며, 동의합니다.
        </label>
        <label>
          <input type="checkbox" checked={agreements.thirdParty} onChange={() => toggleAgreement('thirdParty')} />
          개인정보 제3자 제공에 동의합니다.
        </label>
      </div>

      <button
        className="next-button"
        onClick={onClickPayment}
        disabled={!(agreements.terms && agreements.cancelPolicy && agreements.thirdParty)}
      >
        결제
      </button>
    </div>
  );
};

export default Payment;
