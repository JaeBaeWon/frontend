import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ShowGrid from "../../components/performance/ShowGrid";
import Pagination from "../../components/performance/Pagination";
import axios from "axios";
import "./ShowList.css";

function ShowList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genreSlug = searchParams.get("genre") || "musical";

  const genreMap = {
    musical: "뮤지컬",
    concert: "콘서트",
    play: "연극",
    upcoming: "오픈 예정",
  };

  const displayGenre = genreMap[genreSlug] || "뮤지컬";

  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getApiUrl = (genreSlug, page) => {
    if (genreSlug === "upcoming") {
      return `http://localhost:8080/performance/search?status=UPCOMING&page=${page}`;
    }
    return `http://localhost:8080/performance/category?category=${genreSlug.toUpperCase()}&page=${page}`;
  };

  useEffect(() => {
    setLoading(true);
    const apiUrl = getApiUrl(genreSlug, currentPage - 1);

    axios
      .get(apiUrl)
      .then((res) => {
        setEvents(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("공연 데이터 로딩 실패:", err))
      .finally(() => setLoading(false));

    window.scrollTo(0, 0);
  }, [genreSlug, currentPage]);

  const mappedShows = events.map((item) => ({
    performId: item.performId,
    title: item.title,
    venue: item.location,
    period: `${item.performStartAt} ~ ${item.performEndAt}`,
    thumbnailUrl: item.performImg,
  }));

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
              <ShowGrid shows={mappedShows} />
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
