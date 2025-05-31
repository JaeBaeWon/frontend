import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPerformanceList.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const locations = ["서울", "부산", "대구", "인천", "대전", "광주", "울산"];
const dummyPerformances = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `테스트 공연 ${i + 1}`,
  location: locations[i % locations.length],
}));

const ITEMS_PER_PAGE = 10;

const MyPerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // 나중에 API 연동 예정, 지금은 더미 데이터 사용
    setPerformances(dummyPerformances);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setPerformances(performances.filter((p) => p.id !== id));
  };

  // 페이지네이션 관련
  const totalPages = Math.ceil(performances.length / ITEMS_PER_PAGE);
  const pagedPerformances = performances.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="mypageContainer">
      <Header />
      <div className="mypageContent">
        <main className="main">
          <div className="titleRow">
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
              {pagedPerformances.map((p) => (
                <li key={p.id} className="listItem">
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
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyPerformanceList;
