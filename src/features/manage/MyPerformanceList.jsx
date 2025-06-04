import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyPerformanceList.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const MyPerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/performance/manage/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPerformances(res.data);
      } catch (error) {
        console.error("❌ 공연 목록 조회 실패:", error);
        alert("공연 목록을 불러오지 못했습니다.");
      }
    };

    fetchPerformances();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/performance/manage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setPerformances((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("❌ 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(performances.length / ITEMS_PER_PAGE);
  const pagedPerformances = performances.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const noticeSummary =
    "파트너사 여러분을 환영합니다! 시스템 및 정책 안내를 꼭 확인해 주세요.";

  return (
    <div className="mypageContainer">
      <Header />
      <div className="mypageContent">
        <main className="main">
          <div
            className="noticeBox"
            onClick={() => setNoticeOpen(true)}
            style={{ cursor: "pointer" }}
            title="공지사항 더보기"
          >
            <strong>공지사항</strong>
            <span className="noticeContent">{noticeSummary}</span>
          </div>
          <div className="infoCardWrapper">
            <div
              className="cardHeader"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "10px",
              }}
            >
              <h2 className="title">등록 공연 관리</h2>
              <button
                className="addBtn"
                onClick={() => navigate("/manage/performance-form")}
              >
                공연 등록
              </button>
            </div>
            <div className="infoCard">
              <ul className="list">
                {pagedPerformances.map((p, idx) => (
                  <li key={p.id} className="listItem">
                    <span className="index">
                      {String((page - 1) * ITEMS_PER_PAGE + idx + 1).padStart(
                        3,
                        "0",
                      )}
                    </span>
                    <span className="info">
                      {p.title} - {p.location}
                    </span>
                    <button
                      className="deleteBtn"
                      onClick={() => handleDelete(p.id)}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`paginationBtn${page === i + 1 ? " active" : ""}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyPerformanceList;
