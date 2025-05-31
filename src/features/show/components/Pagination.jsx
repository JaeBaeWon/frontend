import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "32px 0 0 0",
        gap: "4px",
      }}
    >
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: "0 4px",
            padding: "8px 16px",
            fontSize: "15px",
            backgroundColor:
              page === currentPage ? "var(--primary)" : "#f0f0f0",
            color: page === currentPage ? "#fff" : "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            outline: "none",
            fontWeight: page === currentPage ? "600" : "400",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
