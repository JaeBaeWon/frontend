import React from "react";
import ShowCard from "./ShowCard";

function ShowGrid({ shows }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "32px",
        padding: "40px 0",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {shows.map((show) => (
        <ShowCard
          key={show.id}
          title={show.title}
          venue={show.venue}
          period={show.period}
          thumbnailUrl={show.thumbnailUrl}
        />
      ))}
    </div>
  );
}

export default ShowGrid;
