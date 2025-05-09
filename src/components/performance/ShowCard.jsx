import React from "react";

function ShowCard({ title, venue, period, thumbnailUrl, extra }) {
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
      <img
        src={thumbnailUrl}
        alt={title}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px" }}>
        <div
          style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
        >
          {title}
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
