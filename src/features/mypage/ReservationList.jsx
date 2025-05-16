import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/navigation/Sidebar";
import styles from "./ReservationList.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PAGE_SIZE = 15;

function ReservationList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get("/auth/reservation", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReservations(res.data);
      } catch (error) {
        console.error("❌ 예매 내역 불러오기 실패", error);
      }
    };

    fetchReservations();
  }, []);

  const totalCount = reservations.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const currentPageData = reservations.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} />
      <div className={styles.inner}>
        <Sidebar active="예매 내역" />
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
                {currentPageData.map((r) => (
                  <tr key={r.id}>
                    <td>{r.createdAt?.slice(0, 10) || "-"}</td>
                    <td>
                      <span className={styles.resNum}>{r.reservationNumber}</span>
                    </td>
                    <td style={{ maxWidth: 180 }}>{r.showName}</td>
                    <td>{r.viewDate}</td>
                    <td>{r.ticketCount}매</td>
                    <td>{r.cancelableUntil}</td>
                    <td>{r.status}</td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => navigate(`/mypage/reservations/${r.id}`)}
                      >
                        상세
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
