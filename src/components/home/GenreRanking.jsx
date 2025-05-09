import React, { useEffect, useState } from "react";
import ShowCard from "../performance/ShowCard"; // 상대 경로는 위치에 따라 조정
import { useNavigate } from "react-router-dom";

const tabs = ["뮤지컬", "콘서트", "연극"];

function GenreRanking() {
  const [selectedTab, setSelectedTab] = useState("뮤지컬");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?genre=${encodeURIComponent(selectedTab)}`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("장르별 공연 데이터 실패:", err))
      .finally(() => setLoading(false));
  }, [selectedTab]);

  return (
    <section style={{ padding: "60px 40px" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        장르별 랭킹
      </h2>

      {/* 탭 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
          borderBottom: "2px solid #ddd",
          marginBottom: "32px",
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            style={{
              paddingBottom: "12px",
              fontSize: "16px",
              fontWeight: "600",
              color: selectedTab === tab ? "var(--primary)" : "#888",
              borderBottom:
                selectedTab === tab
                  ? "3px solid var(--primary)"
                  : "3px solid transparent",
              cursor: "pointer",
              transition: "border-bottom 0.3s ease, color 0.3s ease",
            }}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      {loading ? (
        <p style={{ textAlign: "center" }}>로딩 중...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {events.map((event) => (
              <ShowCard
                key={event.id}
                title={event.title}
                venue={event.venue}
                period={event.period}
                thumbnailUrl={event.thumbnailUrl}
              />
            ))}
          </div>

          <button
            style={{
              marginTop: "40px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "10px 20px",
              backgroundColor: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/show/ranking")}
          >
            랭킹 더보기
          </button>
        </>
      )}
    </section>
  );
}

export default GenreRanking;
