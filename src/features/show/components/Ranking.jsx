import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import "./Ranking.css";
import ShowCard from "./ShowCard";

// 더미 데이터 20개 (실제 API 연동 시 대체)
const dummyRanking = [
  {
    id: 1,
    title: "알라딘 (ALADDIN)",
    venue: "부산 드림씨어터",
    period: "2025.7.11 ~ 9.28",
    thumbnailUrl: "/images/aladdin.jpg",
    genre: "뮤지컬",
  },
  {
    id: 2,
    title: "팬텀 (PHANTOM)",
    venue: "세종문화회관 대극장",
    period: "2025.5.31 ~ 8.11",
    thumbnailUrl: "/images/phantom.jpg",
    genre: "뮤지컬",
  },
  {
    id: 3,
    title: "도리안 그레이",
    venue: "홍익대 대학로 아트센터 대극장",
    period: "2025.3.30 ~ 6.8",
    thumbnailUrl: "/images/dorian.jpg",
    genre: "뮤지컬",
  },
  {
    id: 4,
    title: "멤피스",
    venue: "충무아트센터 대극장",
    period: "2025.6.17 ~ 9.21",
    thumbnailUrl: "/images/memphis.jpg",
    genre: "뮤지컬",
  },
  {
    id: 5,
    title: "알라딘 한국 초연",
    venue: "샤롯데씨어터",
    period: "2024.11.22 ~ 2025.6.22",
    thumbnailUrl: "/images/aladdin2.jpg",
    genre: "뮤지컬",
  },
  {
    id: 6,
    title: "지킬앤하이드 20주년",
    venue: "블루스퀘어 신한카드홀",
    period: "2024.11.29 ~ 2025.5.18",
    thumbnailUrl: "/images/jekyll.jpg",
    genre: "뮤지컬",
  },
  {
    id: 7,
    title: "라이카",
    venue: "두산아트센터 연강홀",
    period: "2025.3.14 ~ 5.18",
    thumbnailUrl: "/images/laika.jpg",
    genre: "뮤지컬",
  },
  {
    id: 8,
    title: "긴긴밤",
    venue: "NOL 서경스퀘어 스콘 2관",
    period: "2025.3.12 ~ 5.25",
    thumbnailUrl: "/images/night.jpg",
    genre: "뮤지컬",
  },
  {
    id: 9,
    title: "태양의서커스 쿠자 부산",
    venue: "신세계 센텀시티 내 빅탑",
    period: "2025.8.21 ~ 9.28",
    thumbnailUrl: "/images/koza.jpg",
    genre: "뮤지컬",
  },
  {
    id: 10,
    title: "레미제라블",
    venue: "예술의전당 오페라극장",
    period: "2025.4.1 ~ 6.30",
    thumbnailUrl: "/images/lesmis.jpg",
    genre: "뮤지컬",
  },
  {
    id: 11,
    title: "위키드",
    venue: "블루스퀘어 인터파크홀",
    period: "2025.5.1 ~ 7.31",
    thumbnailUrl: "/images/wicked.jpg",
    genre: "뮤지컬",
  },
  {
    id: 12,
    title: "노트르담 드 파리",
    venue: "세종문화회관 대극장",
    period: "2025.6.1 ~ 8.15",
    thumbnailUrl: "/images/notre.jpg",
    genre: "뮤지컬",
  },
  {
    id: 13,
    title: "캣츠",
    venue: "샤롯데씨어터",
    period: "2025.7.1 ~ 9.15",
    thumbnailUrl: "/images/cats.jpg",
    genre: "뮤지컬",
  },
  {
    id: 14,
    title: "시카고",
    venue: "디큐브아트센터",
    period: "2025.8.1 ~ 10.10",
    thumbnailUrl: "/images/chicago.jpg",
    genre: "뮤지컬",
  },
  {
    id: 15,
    title: "오페라의 유령",
    venue: "예술의전당 오페라극장",
    period: "2025.9.1 ~ 11.30",
    thumbnailUrl: "/images/phantom2.jpg",
    genre: "뮤지컬",
  },
  {
    id: 16,
    title: "킹키부츠",
    venue: "충무아트센터 대극장",
    period: "2025.10.1 ~ 12.31",
    thumbnailUrl: "/images/kinky.jpg",
    genre: "뮤지컬",
  },
  {
    id: 17,
    title: "드라큘라",
    venue: "블루스퀘어 신한카드홀",
    period: "2025.11.1 ~ 12.31",
    thumbnailUrl: "/images/dracula.jpg",
    genre: "뮤지컬",
  },
  {
    id: 18,
    title: "엘리자벳",
    venue: "예술의전당 오페라극장",
    period: "2025.12.1 ~ 2026.2.28",
    thumbnailUrl: "/images/elisabeth.jpg",
    genre: "뮤지컬",
  },
  {
    id: 19,
    title: "마틸다",
    venue: "샤롯데씨어터",
    period: "2026.1.1 ~ 3.31",
    thumbnailUrl: "/images/matilda.jpg",
    genre: "뮤지컬",
  },
  {
    id: 20,
    title: "빌리 엘리어트",
    venue: "디큐브아트센터",
    period: "2026.2.1 ~ 4.30",
    thumbnailUrl: "/images/billy.jpg",
    genre: "뮤지컬",
  },
];

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
