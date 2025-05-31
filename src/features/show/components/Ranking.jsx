import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import "./Ranking.css";
import ShowCard from "./ShowCard";

const PAGE_SIZE = 6;

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef(null);

  useEffect(() => {
    // 실제 API 연동 시 fetch로 대체
    setTimeout(() => {
      setRanking(dummyRanking);
      setLoading(false);
    }, 500);
  }, []);

  // 인피니티 스크롤 Intersection Observer (4~20위 리스트에만 적용)
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, 17)); // 4~20위(17개)
  }, []);

  useEffect(() => {
    if (loading) return;
    if (visibleCount >= 17) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, visibleCount, loadMore]);

  // 4~20위 리스트 데이터
  const listData = ranking.slice(3, 3 + visibleCount);

  // 장르별로 그룹화하는 함수
  const groupByGenre = (shows) => {
    return shows.reduce((acc, show) => {
      acc[show.genre] = acc[show.genre] || [];
      acc[show.genre].push(show);
      return acc;
    }, {});
  };

  const genreGroups = groupByGenre(ranking);

  return (
    <div className="rankingContainer">
      <Header />
      <main className="rankingMain">
        <h2 className="rankingTitle">실시간 랭킹</h2>
        {loading ? (
          <p className="loadingText">로딩 중...</p>
        ) : (
          Object.entries(genreGroups).map(([genre, shows]) => (
            <section key={genre} className="genreSection">
              <h3 className="genreTitle">{genre}</h3>
              {/* 1~3위 카드 */}
              <div className="rankingGrid">
                {shows.slice(0, 3).map((show, idx) => (
                  <div key={show.id} className="rankingCardWrap">
                    <div className="rankBadge">{idx + 1}</div>
                    <ShowCard {...show} />
                  </div>
                ))}
              </div>
              {/* 4~20위 리스트 */}
              <ul className="rankingList">
                {listData.map((show, idx) => (
                  <li key={show.id} className="rankingListItem">
                    <span className="listRank">{idx + 4}</span>
                    <img
                      src={show.thumbnailUrl}
                      alt={show.title}
                      className="listThumb"
                    />
                    <div className="listInfo">
                      <div className="listTitle">{show.title}</div>
                      <div className="listVenue">{show.venue}</div>
                      <div className="listPeriod">{show.period}</div>
                    </div>
                  </li>
                ))}
              </ul>
              {visibleCount < 17 && (
                <div ref={loaderRef} className="loadingText">
                  더 불러오는 중...
                </div>
              )}
            </section>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Ranking;
