import React from "react";
import { Link } from "react-router-dom";

function ShowCard({ performId, title, venue, period, thumbnailUrl, extra }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <div className="show-card-image">
        <img
          src={thumbnailUrl}
          alt={title}
          style={{ width: "100%", height: "180px", objectFit: "contain" }}
        />
      </div>
      <div style={{ padding: "16px" }}>
        <div
          style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
        >
          <Link
            to={`/show/${performId}`}
            style={{ color: "#222", textDecoration: "none" }}
          >
            {title}
          </Link>
        </div>
        {venue && (
          <div style={{ fontSize: "13px", color: "#666" }}>{venue}</div>
        )}
        {period && (
          <div style={{ fontSize: "13px", color: "#666" }}>{period}</div>
        )}
        {extra && (
          <div style={{ fontSize: "13px", color: "#888" }}>{extra}</div>
        )}
      </div>
    </div>
  );
}

export default ShowCard;
