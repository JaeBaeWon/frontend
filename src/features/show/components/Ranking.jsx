import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import "./Ranking.css";
import ShowCard from "./ShowCard";

const PAGE_SIZE = 6;

// 더미 데이터 (DB 연동 구조 고려)
const dummyRanking = [
  // 1~3위: Concer_01~03
  {
    id: 1,
    title: "Concer_01",
    genre: "콘서트",
    thumbnailUrl: "/images/concert_01.jpg",
    venue: "올림픽홀",
    period: "2024.07.01 ~ 2024.07.10",
  },
  {
    id: 2,
    title: "Concer_02",
    genre: "콘서트",
    thumbnailUrl: "/images/concert_02.jpg",
    venue: "세종문화회관",
    period: "2024.07.11 ~ 2024.07.20",
  },
  {
    id: 3,
    title: "Concer_03",
    genre: "콘서트",
    thumbnailUrl: "/images/concert_03.jpg",
    venue: "예술의전당",
    period: "2024.07.21 ~ 2024.07.30",
  },
  // 4~15위: PERFORM IMAGES 임의 데이터
  {
    id: 4,
    title: "뮤지컬 드림나이트",
    genre: "뮤지컬",
    thumbnailUrl: "/images/perform_01.jpg",
    venue: "LG아트센터",
    period: "2024.08.01 ~ 2024.08.10",
  },
  {
    id: 5,
    title: "연극 햄릿",
    genre: "연극",
    thumbnailUrl: "/images/perform_02.jpg",
    venue: "국립극장",
    period: "2024.08.11 ~ 2024.08.20",
  },
  {
    id: 6,
    title: "발레 백조의 호수",
    genre: "발레",
    thumbnailUrl: "/images/perform_03.jpg",
    venue: "예술의전당 오페라극장",
    period: "2024.08.21 ~ 2024.08.30",
  },
  {
    id: 7,
    title: "오페라 라 트라비아타",
    genre: "오페라",
    thumbnailUrl: "/images/perform_04.jpg",
    venue: "서울오페라하우스",
    period: "2024.09.01 ~ 2024.09.10",
  },
  {
    id: 8,
    title: "뮤지컬 캣츠",
    genre: "뮤지컬",
    thumbnailUrl: "/images/perform_05.jpg",
    venue: "블루스퀘어",
    period: "2024.09.11 ~ 2024.09.20",
  },
  {
    id: 9,
    title: "연극 리차드 3세",
    genre: "연극",
    thumbnailUrl: "/images/perform_06.jpg",
    venue: "대학로예술극장",
    period: "2024.09.21 ~ 2024.09.30",
  },
  {
    id: 10,
    title: "발레 호두까기 인형",
    genre: "발레",
    thumbnailUrl: "/images/perform_07.jpg",
    venue: "국립극장 해오름",
    period: "2024.10.01 ~ 2024.10.10",
  },
  {
    id: 11,
    title: "오페라 카르멘",
    genre: "오페라",
    thumbnailUrl: "/images/perform_08.jpg",
    venue: "예술의전당",
    period: "2024.10.11 ~ 2024.10.20",
  },
  {
    id: 12,
    title: "뮤지컬 위키드",
    genre: "뮤지컬",
    thumbnailUrl: "/images/perform_09.jpg",
    venue: "샤롯데씨어터",
    period: "2024.10.21 ~ 2024.10.30",
  },
  {
    id: 13,
    title: "연극 오셀로",
    genre: "연극",
    thumbnailUrl: "/images/perform_10.jpg",
    venue: "국립극단",
    period: "2024.11.01 ~ 2024.11.10",
  },
  {
    id: 14,
    title: "발레 지젤",
    genre: "발레",
    thumbnailUrl: "/images/perform_11.jpg",
    venue: "예술의전당",
    period: "2024.11.11 ~ 2024.11.20",
  },
  {
    id: 15,
    title: "오페라 토스카",
    genre: "오페라",
    thumbnailUrl: "/images/perform_12.jpg",
    venue: "서울오페라하우스",
    period: "2024.11.21 ~ 2024.11.30",
  },
];

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

  // 인피니티 스크롤 Intersection Observer (4~15위 리스트에만 적용)
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, 12)); // 4~15위(12개)
  }, []);

  useEffect(() => {
    if (loading) return;
    if (visibleCount >= 12) return;
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

  // 4~15위 리스트 데이터
  const listData = ranking.slice(3, 3 + visibleCount);

  return (
    <div className="rankingContainer">
      <Header />
      <main className="rankingMain">
        <h2 className="rankingTitle">실시간 랭킹</h2>
        {loading ? (
          <p className="loadingText">로딩 중...</p>
        ) : (
          <section className="genreSection">
            {/* 1~3위 카드 */}
            <div className="rankingGrid">
              {ranking.slice(0, 3).map((show, idx) => (
                <div key={show.id} className="rankingCardWrap">
                  <div className="rankBadge">{idx + 1}</div>
                  <ShowCard {...show} />
                </div>
              ))}
            </div>
            {/* 4~15위 리스트 */}
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
            {visibleCount < 12 && (
              <div ref={loaderRef} className="loadingText">
                더 불러오는 중...
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Ranking;
