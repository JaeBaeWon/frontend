import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const Payment = ({
  setCurrentStep,
  setReservationId,
  selectedSeatIds,
  performId,
  user,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedPg, setSelectedPg] = useState("html5_inicis");
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    cancelPolicy: false,
    thirdParty: false,
  });

  // 1️⃣ 공연 정보 가져오기
  const [performanceData, setPerformanceData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get(`${API_BASE_URL}/user/info`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data.member);
      })
      .catch((err) => {
        console.error("사용자 정보 로드 실패:", err);
      });
  }, []);

  // 공연 정보 가져오기 (performId 기반)
  useEffect(() => {
    if (performId) {
      axios
        .get(`${API_BASE_URL}/performance/${performId}`)
        .then((response) => {
          setPerformanceData(response.data); // 공연 정보 상태에 저장
        })
        .catch((error) => {
          console.error("공연 정보를 로드하는 데 실패했습니다.", error);
        });
    }
  }, [performId]);

  const getRefundDeadline = () => {
    if (!performanceData?.performStartAt) return "";

    const date = new Date(performanceData.performStartAt);
    date.setDate(date.getDate() - 1); // 하루 전
    date.setHours(17, 0, 0); // 17:00 고정

    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const userId = user?.id;

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
    if (!window.IMP || !userData || !performanceData) {
      alert("필수 정보가 누락되었습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init("imp00577760");

    if (!performanceData) {
      alert("공연 정보가 로드되지 않았습니다.");
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
          buyer_tel: userData.phone,
        },
        async (rsp) => {
          if (rsp.success) {
            alert(`✅ 결제 성공`);

            if (
              !rsp.imp_uid ||
              !rsp.merchant_uid ||
              !performId ||
              !selectedSeatIds.length ||
              !selectedSeatIds[0]
            ) {
              alert("❌ 필수 결제 정보가 누락되었습니다.");
              console.warn("🚨 누락된 값 확인:", {
                imp_uid: rsp.imp_uid,
                merchant_uid: rsp.merchant_uid,
                performanceId: performId,
                selectedSeatIds,
              });
              return;
            }

            // 3️⃣ 서버에 결제 검증
            try {
              const token = localStorage.getItem("accessToken");

              // 1️⃣ 결제 검증
              const verifyRes = await axios.post(
                `${API_BASE_URL}/payment/verify-redis`,
                {
                  impUid: rsp.imp_uid,
                  merchantUid: rsp.merchant_uid,
                  performanceId: performId,
                  seatId: selectedSeatIds[0],
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                },
              );

              const ticketId = verifyRes.data.ticketId;

              // 2️⃣ 예매 ID 조회
              setTimeout(async () => {
                try {
                  const reservationRes = await axios.get(
                    `${API_BASE_URL}/reservation/by-ticket/${ticketId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      withCredentials: true,
                    },
                  );

                  setReservationId(reservationRes.data.reservationId);

                  // 이메일 전송 API 호출
                  await axios.post(`${API_BASE_URL}/email/send`, {
                    email: reservationRes.data.userEmail,
                    username: reservationRes.data.username,
                    title: reservationRes.data.performanceTitle,
                    performStartAt: reservationRes.data.performanceStartAt,
                    performEndAt: reservationRes.data.performanceEndAt,
                    location: reservationRes.data.performanceLocation,
                    seatSection: reservationRes.data.seatSection,
                    seatNum: reservationRes.data.seatNum,
                    paymentAmount: reservationRes.data.paymentAmount,
                    paymentDate: reservationRes.data.paymentTime,
                  })
                    .then(() => {
                      console.log("✅ 이메일 전송 성공");
                    })
                    .catch((err) => {
                      console.error("❌ 이메일 전송 실패:", err);
                    });

                  alert("🎉 결제 및 예매 완료!");
                  setCurrentStep(4);
                } catch (error) {
                  console.error("❌ 예약 ID 조회 실패", error);
                  alert("예약 정보 확인 중 오류가 발생했습니다.");
                }
              }, 2000);
            } catch (error) {
              console.error(
                "❌ 결제 검증 실패:",
                error.response?.data || error.message,
              );
              alert("결제는 성공했지만 서버에 저장되지 않았습니다.");
            }
          } else {
            alert(`❌ 결제 실패: ${rsp.error_msg}`);
          }
        },
      );
    } catch (error) {
      console.error("❌ 예약/결제 오류:", error);
      alert("결제 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="payment-container">
      <div>
        <div className="payment-buttons">
          <button
            className={selectedPg === "kakaopay" ? "selected kakaopay" : ""}
            onClick={() => {
              setSelectedPg("kakaopay");
              setSelectedMethod("card");
            }}
          >
            카카오페이 결제
          </button>
          <button
            className={selectedPg === "html5_inicis" ? "selected cardpay" : ""}
            onClick={() => {
              setSelectedPg("html5_inicis");
              setSelectedMethod("card");
            }}
          >
            신용카드 결제
          </button>
        </div>

        <div className="refund-info">
          <div className="refund-deadline">
            <strong>취소 가능 마감 시간 : </strong>
            <span style={{ color: "red" }}>{getRefundDeadline()}까지</span>
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
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={() => toggleAgreement("terms")}
            />
            개인정보 수집 및 이용에 동의합니다.
          </label>
          <label>
            <input
              type="checkbox"
              checked={agreements.cancelPolicy}
              onChange={() => toggleAgreement("cancelPolicy")}
            />
            취소수수료 및 취소기한을 확인했으며, 동의합니다.
          </label>
          <label>
            <input
              type="checkbox"
              checked={agreements.thirdParty}
              onChange={() => toggleAgreement("thirdParty")}
            />
            개인정보 제3자 제공에 동의합니다.
          </label>
        </div>
      </div>

      <button
        className="confirm-pay-button"
        onClick={() => onClickPayment(selectedPg, selectedMethod)}
        disabled={
          !(
            agreements.terms &&
            agreements.cancelPolicy &&
            agreements.thirdParty
          )
        }
      >
        결제하기
      </button>
    </div>
  );
};

export default Payment;
