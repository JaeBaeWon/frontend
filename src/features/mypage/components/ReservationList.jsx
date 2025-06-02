import React, { useState, useEffect } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Sidebar from "../../../components/navigation/Sidebar";
import "./ReservationList.css";
import { useNavigate } from "react-router-dom";
import MypageLayout from "./MypageLayout";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;
const PAGE_SIZE = 15;

function ReservationList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/reservation`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });

        console.log("✅ 예약 목록 응답:", res.data);

        // ✅ 구조에 따라 수정
        const data = res.data;
        const reservationArray = Array.isArray(data) ? data : data.reservations;

        setReservations(reservationArray || []);
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
    page * PAGE_SIZE,
  );

  return (
    <MypageLayout activeMenu="예매 내역">
      <h2 className="title">예매 내역</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>예약번호</th>
              <th>공연명</th>
              <th>관람일</th>
              <th>매수</th>
              <th>취소가능일</th>
              <th>예약상태</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((r, idx) => {
              const performanceDate = new Date(r.performanceStartAt);
              const cancelableDate = new Date(performanceDate);
              cancelableDate.setDate(performanceDate.getDate() - 7);

              const format = (date) =>
                date instanceof Date && !isNaN(date)
                  ? date.toISOString().slice(0, 10)
                  : "-";

              return (
                <tr key={r.ticketId}>
                  <td
                    className={
                      r.reservationStatus === "CANCELED"
                        ? "status-canceled"
                        : ""
                    }
                  >
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td
                    className={
                      r.reservationStatus === "CANCELED"
                        ? "status-canceled"
                        : ""
                    }
                  >
                    <span className="resNum">{r.ticketId}</span>
                  </td>
                  <td style={{ maxWidth: 180 }}>{r.title}</td>
                  <td>{format(performanceDate)}</td>
                  <td>{r.ticketCount ?? "1"}매</td>
                  <td>{format(cancelableDate)}</td>
                  <td>{r.reservationStatus || "-"}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() =>
                        navigate(`/mypage/reservations/${r.reservationId}`)
                      }
                    >
                      상세
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx + 1}
              className={page === idx + 1 ? "pageBtn pageBtnActive" : "pageBtn"}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </MypageLayout>
  );
}

export default ReservationList;
