import React from "react";
import { useNavigate } from "react-router-dom";

function ShowCard({ performId, title, venue, period, thumbnailUrl }) {
  const navigate = useNavigate();
  return (
    <div
      className="show-card"
      onClick={() => navigate(`/show/${performId}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="show-card-image">
        <img src={thumbnailUrl} alt={title} />
      </div>
      <div className="show-card-title">{title}</div>
      <div className="show-card-subhead">{venue}</div>
      {/* period가 있으면 날짜로 사용 (UpcomingEvents는 openingTime, ShowList는 period) */}
      {period && (
        <div className="show-card-subhead upcoming-date">{period}</div>
      )}
    </div>
  );
}

export default ShowCard;
