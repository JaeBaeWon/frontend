import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import styles from "./ReservationDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/navigation/Sidebar";
import axios from "axios";

function ReservationDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL의 reservation ID
  const [reservationDetail, setReservationDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/auth/reservation/${id}`)
      .then((res) => {
        setReservationDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("예약 상세 정보를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className={styles.container}>불러오는 중...</div>;
  if (error || !reservationDetail) return <div className={styles.container}>{error}</div>;

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} />
      <div className={styles.inner}>
        <Sidebar active="예매 내역" />
        <div style={{ flex: 1 }}>
          <div className={styles.title}>예매 상세 내역 확인/취소</div>
          <div className={styles.breadcrumb}>
            &gt;{" "}
            <span className={styles.productTitle}>
              {reservationDetail.showTitle}
            </span>
          </div>

          {/* 공연 정보 */}
          <div className={styles.section}>
            <div className={styles.flexRow}>
              <img
                src={reservationDetail.showImage}
                alt="공연 포스터"
                className={styles.thumbnail}
                onError={(e) => (e.target.style.display = "none")}
              />
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <th>예매자</th>
                    <td>{reservationDetail.reserver}</td>
                  </tr>
                  <tr>
                    <th>예약번호</th>
                    <td>{reservationDetail.reservationNumber}</td>
                  </tr>
                  <tr>
                    <th>이용일</th>
                    <td>{reservationDetail.useDate}</td>
                  </tr>
                  <tr>
                    <th>장소</th>
                    <td>
                      {reservationDetail.place}
                      <a
                        href={reservationDetail.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mapBtn}
                      >
                        지도보기
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>티켓수령 방법</th>
                    <td>
                      <span className={styles.ticketMethod}>
                        {reservationDetail.ticketMethod}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th></th>
                    <td>
                      <div className={styles.noticeBox}>
                        {reservationDetail.notice}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 결제내역 */}
          <div className={styles.section}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>결제내역</div>
            <table className={styles.infoTable}>
              <tbody>
                <tr>
                  <th>예매일</th>
                  <td>{reservationDetail.payDate}</td>
                  <th>현재상태</th>
                  <td>{reservationDetail.status}</td>
                </tr>
                <tr>
                  <th>결제수단</th>
                  <td>{reservationDetail.payMethod}</td>
                  <th>결제상태</th>
                  <td>{reservationDetail.payStatus}</td>
                </tr>
              </tbody>
            </table>

            <table className={styles.payTable} style={{ marginTop: 18 }}>
              <thead>
                <tr>
                  <th>예매번호</th>
                  <th>좌석등급</th>
                  <th>가격등급</th>
                  <th>좌석번호</th>
                  <th>가격</th>
                  <th>취소여부</th>
                </tr>
              </thead>
              <tbody>
                {reservationDetail.seatList.map((seat, idx) => (
                  <tr key={idx}>
                    <td>{seat.reservationNumber}</td>
                    <td>{seat.seatGrade}</td>
                    <td>{seat.priceGrade}</td>
                    <td>{seat.product}</td>
                    <td>{seat.price.toLocaleString()}원</td>
                    <td>
                      {seat.canceled ? (
                        <span>
                          취소됨 <br />
                          <span style={{ color: "#888", fontSize: 13 }}>
                            {seat.cancelDate}
                          </span>
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.paySummary}>
              <div>
                총 결제금액{" "}
                <span>{reservationDetail.payAmount.toLocaleString()}원</span>
              </div>
              <div>
                취소수수료{" "}
                <span>{reservationDetail.cancelFee.toLocaleString()}원</span>
              </div>
              <div>
                환불 금액{" "}
                <span>{reservationDetail.refundAmount.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 유의사항 */}
          <div className={styles.section}>
            <div className={styles.cautionTitle}>예매취소 유의사항</div>
            <div className={styles.cautionBox}>
              <b>취소 마감시간</b>{" "}
              <span style={{ color: "var(--color-point)", fontWeight: 600 }}>
                {reservationDetail.cancelDeadline}
              </span>
            </div>
            <div className={styles.cautionBox}>
              <b>취소 수수료</b> <br />
              <span style={{ color: "var(--color-text-sub)" }}>
                <b>취소일자에 따라 취소수수료가 달라집니다.</b>
                <br />* 단, 예매당일 밤 12시 이전 취소시에는 취소수수료 없음
              </span>
              <table className={styles.cautionTable}>
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
                      <td className={styles[row.feeClass]}>{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 버튼 */}
          <div className={styles.btnRow}>
            <button className={styles.btn} onClick={() => navigate("/mypage/reservations")}>
              예매 내역 목록
            </button>
            <button
              className={`${styles.btn} ${styles.btnMain}`}
              onClick={() => navigate(`/mypage/reservations/${id}/cancel`)}
            >
              예매 취소하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReservationDetail;
