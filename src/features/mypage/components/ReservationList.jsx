import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Sidebar from "../../../components/navigation/Sidebar";
import styles from "./ReservationList.css";
import { useNavigate } from "react-router-dom";

// 더미 데이터 생성
const dummyReservations = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  date: i % 2 === 0 ? "2025.02.23" : "2025.02.20",
  reservationNumber: i % 2 === 0 ? "T2668747460" : "T2666419030",
  showName:
    i % 2 === 0
      ? "NCT 127 : The 2nd World Tour 'Neo Zone' in Seoul"
      : "NCT Dream : The Dream Show in Seoul",
  viewDate: i % 2 === 0 ? "2025.05.30 | 17:00" : "2025.07.12 | 23:59",
  ticketCount: 1,
  cancelableUntil: i % 2 === 0 ? "2025.05.30 | 17:00" : "2025.07.12 | 23:59",
  status: "예약완료",
}));

const PAGE_SIZE = 15;

function ReservationList() {
  // 실제 API 연동 시 useEffect/axios로 대체
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalCount = dummyReservations.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const reservations = dummyReservations.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} />
      <div className={styles.inner}>
        {/* Sidebar */}
        <Sidebar active="예매 내역" />
        {/* Main Content */}
        <main className={styles.main}>
          <h2 className={styles.title}>예매 내역</h2>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>예매일</th>
                  <th>예약번호</th>
                  <th>공연명</th>
                  <th>관람일</th>
                  <th>매수</th>
                  <th>취소가능일</th>
                  <th>상태</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>
                      <span className={styles.resNum}>
                        {r.reservationNumber}
                      </span>
                    </td>
                    <td style={{ maxWidth: 180 }}>{r.showName}</td>
                    <td>{r.viewDate}</td>
                    <td>{r.ticketCount}매</td>
                    <td>{r.cancelableUntil}</td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => navigate("/mypage/reservations/details")}
                      >
                        상세
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* 페이지네이션 */}
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx + 1}
                  className={
                    page === idx + 1
                      ? `${styles.pageBtn} ${styles.pageBtnActive}`
                      : styles.pageBtn
                  }
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ReservationList;
