import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';

const Payment = ({ setCurrentStep, setReservationId }) => {
    const navigate = useNavigate();

    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedPg, setSelectedPg] = useState('html5_inicis');
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreements, setAgreements] = useState({
    terms: false,
    cancelPolicy: false,
    thirdParty: false,
  });

    // 1️⃣ 공연 정보 가져오기
    const [performanceData, setPerformanceData] = useState(null);
    const [userId, setUserId] = useState(1);
    const [performId, setPerformId] = useState(5);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
      if (userId) {
        fetch(`http://localhost:8080/reservation/check/user/${userId}`)
          .then((res) => {
            if (!res.ok) throw new Error("사용자 정보 로드 실패");
            return res.json();
          })
          .then((data) => setUserData(data))
          .catch((err) => {
            console.error("사용자 정보 오류:", err);
          });
      }
    }, [userId]);

      // 공연 정보 가져오기 (performId 기반)
      useEffect(() => {
        if (performId) {
          axios
            .get(`http://localhost:8080/performance/${performId}`)
            .then((response) => {
              setPerformanceData(response.data); // 공연 정보 상태에 저장
            })
            .catch((error) => {
              console.error("공연 정보를 로드하는 데 실패했습니다.", error);
            });
        }
      }, [performId]);

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

  const onClickPayment = async (pg, method) => {
      if (!window.IMP) return;
      const IMP = window.IMP;
      IMP.init("imp00577760");

      if (!performanceData) {
            alert('공연 정보가 로드되지 않았습니다.');
            return;
          }

      try {
        // 2️⃣ 결제창 호출
        IMP.request_pay(
          {
            pg: pg,
            pay_method: method,
            merchant_uid: "order_" + new Date().getTime(),
            name: performanceData.title,
            amount: performanceData.price,
            buyer_email: userData.email,
            buyer_name: userData.username,
            buyer_tel: userData.phone
          },
          async function (rsp) {
            if (rsp.success) {
              alert(`✅ 결제 성공: imp_uid = ${rsp.imp_uid}`);

              // 3️⃣ 서버에 결제 검증
              try {
                const verifyResponse = await fetch("http://localhost:8080/payment/verify", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    impUid: rsp.imp_uid,
                    merchantUid: rsp.merchant_uid,
                    userId: userId,
                    performanceId: performId,
                    seatId: 1
                  }),
                });

                if (!verifyResponse.ok) throw new Error("검증 실패");

                const resJson = await verifyResponse.json();
                alert("🎉 결제 및 예매 완료!");

                // 4️⃣ 다음 화면으로 reservationId 전달
                setReservationId(resJson.reservationId);
                setCurrentStep(4); // ShowPayInfo로 이동


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
    <div>
      <div style={{ padding: "40px", textAlign: "center" }}>
        <button onClick={() => onClickPayment("kakaopay", "card")}>🟡 카카오페이 결제</button>
        <button onClick={() => onClickPayment("html5_inicis", "card")}>💳 신용카드 결제 (이니시스)</button>
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
