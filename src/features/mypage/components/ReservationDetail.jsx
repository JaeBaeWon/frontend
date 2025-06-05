import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/layout/Header";
import MypageLayout from "./MypageLayout";
import "./ReservationDetail.css";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function ReservationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reservationDetail, setReservationDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📌 수수료 정책 계산
  const generateCancelPolicy = (startDateStr) => {
    const startDate = new Date(startDateStr);
    const format = (d) => d.toISOString().slice(0, 10);

    return [
      {
        period: "공연일 7일 전까지",
        date: format(new Date(startDate.getTime() - 7 * 86400000)),
        fee: "없음",
        feeClass: "caution10",
      },
      {
        period: "공연일 3~6일 전",
        date: format(new Date(startDate.getTime() - 3 * 86400000)),
        fee: "10%",
        feeClass: "caution10",
      },
      {
        period: "공연일 1~2일 전",
        date: format(new Date(startDate.getTime() - 1 * 86400000)),
        fee: "30%",
        feeClass: "cautionRed",
      },
      {
        period: "공연 당일 및 이후",
        date: format(startDate),
        fee: "환불 불가",
        feeClass: "cautionRed",
      },
    ];
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${API_BASE_URL}/user/reservation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const detail = res.data;

        // 📌 cancelDeadline 계산
        const deadline = new Date(detail.performanceStartAt);
        deadline.setDate(deadline.getDate() - 7);
        const formattedDeadline = deadline.toISOString().slice(0, 10);

        setReservationDetail({
          ...detail,
          cancelDeadline: formattedDeadline,
          cancelPolicy: generateCancelPolicy(detail.performanceStartAt),
        });
        setLoading(false);
      })
      .catch(() => {
        setError("예약 상세 정보를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container">불러오는 중...</div>;
  if (error || !reservationDetail)
    return <div className="container">{error}</div>;

  return (
    <MypageLayout activeMenu="예매 내역">
      <div className="content">
        <div className="title">예매 상세 내역 확인/취소</div>
        <div className="breadcrumb">
          <span className="productTitle">{reservationDetail.showTitle}</span>
        </div>

        <div className="section">
          <div className="flexRow">
            <img
              src={reservationDetail.showImage}
              alt="공연 포스터"
              className="thumbnail"
              onError={(e) => (e.target.style.display = "none")}
            />
            <table className="infoTable">
              <tbody>
                <tr>
                  <th>예약 ID</th>
                  <td>{reservationDetail.reservationId}</td>
                </tr>
                <tr>
                  <th>예매자</th>
                  <td>{reservationDetail.userName}</td>
                </tr>
                <tr>
                  <th>예약번호</th>
                  <td>{reservationDetail.ticketId}</td>
                </tr>
                <tr>
                  <th>이용일</th>
                  <td>{reservationDetail.performanceStartAt?.slice(0, 10)}</td>
                </tr>
                <tr>
                  <th>장소</th>
                  <td>{reservationDetail.location}</td>
                </tr>
                <tr>
                  <th>좌석 번호</th>
                  <td>{reservationDetail.seatInfo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <div className="sectionTitle">결제내역</div>
          <table className="infoTable">
            <tbody>
              <tr>
                <th>예매일</th>
                <td>{reservationDetail.reservationDay?.slice(0, 10) || "-"}</td>
                <th>현재상태</th>
                <td>{reservationDetail.performanceStatus}</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td>{reservationDetail.payType}</td>
                <th>결제상태</th>
                <td>{reservationDetail.paymentStatus}</td>
              </tr>
            </tbody>
          </table>
          <div className="paySummary">
            <div>
              총 결제금액{" "}
              <span>{reservationDetail.paymentAmount?.toLocaleString()}원</span>
            </div>
            <div>
              환불 금액{" "}
              <span>
                {reservationDetail.refundAmount?.toLocaleString() || "0"}원
              </span>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="cautionTitle">예매취소 유의사항</div>
          <div className="cautionBox">
            <b>취소 마감시간</b>{" "}
            <span className="cancelDeadline">
              {reservationDetail.cancelDeadline}
            </span>
          </div>
          <div className="cautionBox">
            <b>취소 수수료</b> <br />
            <span>
              <b>취소일자에 따라 취소수수료가 달라집니다.</b>
              <br />* 예매당일 밤 12시 이전 취소 시 취소수수료 없음(취소기한
              내에 한함)
            </span>
            <table className="cautionTable">
              <thead>
                <tr>
                  <th>내용</th>
                  <th>취소일</th>
                  <th>취소수수료</th>
                </tr>
              </thead>
              <tbody>
                {reservationDetail.cancelPolicy.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.period}</td>
                    <td>{row.date}</td>
                    <td className={row.feeClass}>{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="btnRow">
          <button
            className="btn"
            onClick={() => navigate("/mypage/reservations")}
          >
            예매 내역 목록
          </button>
          {reservationDetail.paymentStatus !== "CANCELED" && (
            <button
              className="btn btnMain"
              onClick={async () => {
                const confirm = window.confirm("정말 예매를 취소하시겠습니까?");
                if (!confirm) return;

                const token = localStorage.getItem("accessToken");

                try {
                  const res = await axios.post(
                    `${API_BASE_URL}/refund/${reservationDetail.paymentId}?reason=사용자요청`,
                    null,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      withCredentials: true,
                    },
                  );

                  alert("✅ 환불 성공");
                  navigate("/mypage/refundcomplete", {
                    state: { reservationId: reservationDetail.reservationId },
                  });
                } catch (error) {
                  console.error("❌ 환불 실패:", error);
                  alert("환불 처리에 실패했습니다.");
                }
              }}
            >
              예매 취소하기
            </button>
          )}
        </div>
      </div>
    </MypageLayout>
  );
}

export default ReservationDetail;
