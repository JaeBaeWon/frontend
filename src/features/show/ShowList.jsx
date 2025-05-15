import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ShowGrid from "./components/ShowGrid";
import Pagination from "./components/Pagination";
import "./ShowList.css";

function ShowList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genreSlug = searchParams.get("genre") || "musical";

  // 영어 → 한글 매핑
  const genreMap = {
    musical: "뮤지컬",
    concert: "콘서트",
    play: "연극",
    upcoming: "오픈 예정",
  };

  const displayGenre = genreMap[genreSlug] || "뮤지컬";

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const eventsPerPage = 16;

  useEffect(() => {
    setLoading(true);
    const endpoint =
      genreSlug === "upcoming"
        ? "/api/upcoming-events"
        : `/api/events?genre=${genreSlug}`; // 이미 슬러그 형태이므로 인코딩 불필요

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setCurrentPage(1);
      })
      .catch((err) => console.error("공연 데이터 로딩 실패:", err))
      .finally(() => setLoading(false));
  }, [genreSlug]);

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const currentShows = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="showlist-container">
      <Header />
      <main className="showlist-main">
        <section className="showlist-section">
          <h2 className="showlist-title">{displayGenre}</h2>
          {loading ? (
            <p className="showlist-loading">로딩 중...</p>
          ) : events.length === 0 ? (
            <p className="showlist-empty">공연이 없습니다.</p>
          ) : (
            <>
              <ShowGrid shows={currentShows} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ShowList;
