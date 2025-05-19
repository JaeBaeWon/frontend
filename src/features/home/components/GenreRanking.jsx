import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../show/ShowList.css";

const tabs = ["뮤지컬", "콘서트", "연극"];

const dummyData = {
  뮤지컬: [
    {
      id: 1,
      title: "레미제라블",
      venue: "블루스퀘어 신한카드홀",
      period: "2024.07.01 ~ 2024.09.30",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=레미제라블",
    },
    {
      id: 2,
      title: "지킬앤하이드",
      venue: "샤롯데씨어터",
      period: "2024.08.10 ~ 2024.10.20",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=지킬앤하이드",
    },
    {
      id: 3,
      title: "위키드",
      venue: "예술의전당 오페라극장",
      period: "2024.09.05 ~ 2024.11.15",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=위키드",
    },
    {
      id: 10,
      title: "노트르담 드 파리",
      venue: "세종문화회관",
      period: "2024.10.01 ~ 2024.12.01",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=노트르담",
    },
  ],
  콘서트: [
    {
      id: 4,
      title: "BTS 콘서트",
      venue: "잠실종합운동장",
      period: "2024.07.20",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=BTS",
    },
    {
      id: 5,
      title: "IU 투어",
      venue: "고척스카이돔",
      period: "2024.08.15",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=IU",
    },
    {
      id: 6,
      title: "임영웅 전국투어",
      venue: "부산 벡스코",
      period: "2024.09.10",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=임영웅",
    },
    {
      id: 11,
      title: "뉴진스 쇼케이스",
      venue: "올림픽공원 체조경기장",
      period: "2024.10.05",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=뉴진스",
    },
  ],
  연극: [
    {
      id: 7,
      title: "햄릿",
      venue: "대학로 예술극장",
      period: "2024.07.05 ~ 2024.08.05",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=햄릿",
    },
    {
      id: 8,
      title: "오셀로",
      venue: "국립극장",
      period: "2024.08.12 ~ 2024.09.12",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=오셀로",
    },
    {
      id: 9,
      title: "리어왕",
      venue: "세종문화회관",
      period: "2024.09.20 ~ 2024.10.20",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=리어왕",
    },
    {
      id: 12,
      title: "로미오와 줄리엣",
      venue: "예술의전당 자유소극장",
      period: "2024.10.15 ~ 2024.11.15",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=로미오와+줄리엣",
    },
  ],
};

function GenreRanking() {
  const [selectedTab, setSelectedTab] = useState("뮤지컬");
  const navigate = useNavigate();
  const events = dummyData[selectedTab];

  return (
    <section
      className="showlist-section"
      style={{
        maxWidth: "1440px",
        margin: "40px auto",
        padding: "0 48px",
        borderRadius: "28px",
      }}
    >
      <h2 className="showlist-title">장르별 랭킹</h2>
      {/* 탭 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
          background: "#f7f7fa",
          borderRadius: "16px",
          padding: "8px",
          border: "none",
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            style={{
              padding: "8px 28px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: selectedTab === tab ? "700" : "400",
              color: selectedTab === tab ? "var(--primary-300)" : "#888",
              background:
                selectedTab === tab ? "var(--primary-100)" : "transparent",
              cursor: "pointer",
              transition: "background 0.3s, color 0.3s, font-weight 0.3s",
              boxShadow:
                selectedTab === tab
                  ? "0 2px 8px 0 rgba(162,136,255,0.08)"
                  : "none",
            }}
            onClick={() => setSelectedTab(tab)}
            onMouseOver={(e) => {
              if (selectedTab !== tab)
                e.currentTarget.style.background = "#eee";
            }}
            onMouseOut={(e) => {
              if (selectedTab !== tab)
                e.currentTarget.style.background = "transparent";
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* 카드 리스트 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "32px",
        }}
      >
        {events.map((event) => (
          <div className="show-card" key={event.id}>
            <div className="show-card-image">
              <img src={event.thumbnailUrl} alt={event.title} />
            </div>
            <div className="show-card-title">{event.title}</div>
            <div className="show-card-subhead">{event.venue}</div>
            <div
              className="show-card-subhead"
              style={{ color: "#888", fontSize: "1rem" }}
            >
              {event.period}
            </div>
          </div>
        ))}
      </div>
      <button
        style={{
          marginTop: "0",
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
    </section>
  );
}

export default GenreRanking;
