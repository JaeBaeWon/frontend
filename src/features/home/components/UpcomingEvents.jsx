import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../show/ShowList.css";
import "./UpcomingEvents.css";
import { BsChevronRight } from "react-icons/bs";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function UpcomingEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/performance/search?status=UPCOMING&page=0`,
        );
        const data = response.data.content.map((item) => ({
          id: item.performId,
          title: item.title,
          venue: item.location,
          openingTime: item.performStartAt,
          thumbnailUrl: item.performImg.startsWith("/")
            ? item.performImg
            : "/" + item.performImg,
        }));
        setEvents(data);
      } catch (error) {
        console.error("오픈 예정 공연 불러오기 실패:", error);
        setEvents([]);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <section className="showlist-section upcoming-section">
      <h2 className="showlist-title">오픈 예정</h2>
      <div className="upcoming-grid">
        {events.map((event) => (
          <div
            className="show-card"
            key={event.id}
            onClick={() => navigate(`/show/${event.id}`)} // ✅ 상세 페이지로 이동
            style={{ cursor: "pointer" }} // UX 개선
          >
            <div className="show-card-image">
              <img src={event.thumbnailUrl} alt={event.title} />
            </div>
            <div className="show-card-title">{event.title}</div>
            <div className="show-card-subhead">{event.venue}</div>
            <div className="show-card-subhead upcoming-date">
              {event.openingTime}
            </div>
          </div>
        ))}
      </div>
      <button
        className="upcoming-more-btn"
        onClick={() => navigate("/shows?genre=upcoming")}
      >
        오픈 예정 더보기
        <BsChevronRight />
      </button>
    </section>
  );
}

export default UpcomingEvents;
