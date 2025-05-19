import React from "react";
import { useNavigate } from "react-router-dom";
import "../../show/ShowList.css";

function UpcomingEvents() {
  const navigate = useNavigate();
  // 더미데이터
  const events = [
    {
      id: 1,
      title: "레미제라블",
      venue: "블루스퀘어 신한카드홀",
      openingTime: "2024.07.01",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=레미제라블",
    },
    {
      id: 2,
      title: "지킬앤하이드",
      venue: "샤롯데씨어터",
      openingTime: "2024.08.10",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=지킬앤하이드",
    },
    {
      id: 3,
      title: "위키드",
      venue: "예술의전당 오페라극장",
      openingTime: "2024.09.05",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=위키드",
    },
    {
      id: 4,
      title: "노트르담 드 파리",
      venue: "세종문화회관",
      openingTime: "2024.10.01",
      thumbnailUrl: "https://via.placeholder.com/400x533?text=노트르담",
    },
  ];

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
      <h2 className="showlist-title">오픈 예정</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "32px",
          maxWidth: "1440px",
          margin: "0 auto 40px auto",
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
              {event.openingTime}
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
        onClick={() => navigate("/shows?genre=upcoming")}
      >
        오픈 예정 더보기
      </button>
    </section>
  );
}

export default UpcomingEvents;
