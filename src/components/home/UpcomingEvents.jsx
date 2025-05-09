import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowGrid from "../performance/ShowGrid";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/upcoming-events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => {
        console.error("오픈 예정 공연 불러오기 실패:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const sectionStyle = {
    padding: "60px 40px",
    fontFamily: "Pretendard, sans-serif",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "32px",
    textAlign: "center",
  };

  const buttonStyle = {
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
  };

  // ShowGrid에 전달할 형태로 가공
  const formattedEvents = events.map((event) => ({
    ...event,
    extra: event.openingTime, // ShowCard의 extra에 전달됨
  }));

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>오픈 예정</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>로딩 중...</p>
      ) : (
        <>
          <ShowGrid shows={formattedEvents} />
          <button
            style={buttonStyle}
            onClick={() => navigate("/shows?genre=upcoming")}
          >
            오픈 예정 더보기
          </button>
        </>
      )}
    </section>
  );
}

export default UpcomingEvents;
