import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../show/ShowList.css";
import "./GenreRanking.css";

const tabs = [
  { label: "뮤지컬", value: "MUSICAL" },
  { label: "콘서트", value: "CONCERT" },
  { label: "연극", value: "PLAY" },
];

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function GenreRanking() {
  const [selectedTab, setSelectedTab] = useState("MUSICAL");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/performance/category?category=${selectedTab}&page=0`,
        );
        const shows = response.data.content.map((item) => ({
          id: item.performId,
          title: item.title,
          venue: item.location,
          period: `${item.performStartAt} ~ ${item.performEndAt}`,
          thumbnailUrl: item.performImg.startsWith("/")
            ? item.performImg
            : "/" + item.performImg,
        }));
        setEvents(shows);
      } catch (error) {
        console.error("공연 데이터 가져오기 실패:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [selectedTab]);

  return (
    <section className="genre-section">
      <h2 className="showlist-title">장르별 랭킹</h2>

      <div className="genre-tab-buttons">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`genre-tab-button ${
              selectedTab === tab.value ? "active" : "inactive"
            }`}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="genre-grid">
        {events.map((event) => (
          <div
            className="show-card"
            key={event.id}
            onClick={() => navigate(`/show/${event.id}`)} // ✅ 상세 페이지로 이동
            style={{ cursor: "pointer" }}
          >
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
        className="genre-more-btn"
        onClick={() => navigate("/show/ranking")}
      >
        랭킹 더보기
      </button>
    </section>
  );
}

export default GenreRanking;
