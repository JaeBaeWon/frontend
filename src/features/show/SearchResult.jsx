import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ShowGrid from "./components/ShowGrid";

// 더미 데이터 (실제 API 연동 시 대체)
const dummyEvents = [
  {
    id: 1,
    title: "알라딘 (ALADDIN)",
    venue: "부산 드림씨어터",
    period: "2025.7.11 ~ 9.28",
    thumbnailUrl: "/images/aladdin.jpg",
  },
  {
    id: 2,
    title: "팬텀 (PHANTOM)",
    venue: "세종문화회관 대극장",
    period: "2025.5.31 ~ 8.11",
    thumbnailUrl: "/images/phantom.jpg",
  },
  {
    id: 3,
    title: "도리안 그레이",
    venue: "홍익대 대학로 아트센터 대극장",
    period: "2025.3.30 ~ 6.8",
    thumbnailUrl: "/images/dorian.jpg",
  },
  // ... 필요시 추가
];

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResult() {
  const query = useQuery();
  const keyword = query.get("keyword")?.trim() || "";
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    // 실제 API 연동 시 fetch로 대체
    setTimeout(() => {
      if (!keyword) {
        setResults([]);
        setLoading(false);
        return;
      }
      const filtered = dummyEvents.filter(
        (e) => e.title.includes(keyword) || e.venue.includes(keyword)
      );
      setResults(filtered);
      setLoading(false);
    }, 400);
  }, [keyword]);

  return (
    <div className="showlist-container">
      <Header />
      <main className="showlist-main">
        <section className="showlist-section">
          <h2 className="showlist-title">검색 결과</h2>
          {loading ? (
            <p className="showlist-loading">로딩 중...</p>
          ) : !keyword ? (
            <p className="showlist-empty">검색어를 입력해 주세요.</p>
          ) : results.length === 0 ? (
            <p className="showlist-empty">검색 결과가 없습니다.</p>
          ) : (
            <ShowGrid shows={results} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
