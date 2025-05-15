import React, { useEffect, useState } from "react";

const bannerImages = [
  "https://via.placeholder.com/1200x300?text=Banner+1",
  "https://via.placeholder.com/1200x300?text=Banner+2",
  "https://via.placeholder.com/1200x300?text=Banner+3",
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 10000); // 10초마다 전환
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const bannerStyle = {
    width: "100%",
    height: "300px",
    backgroundImage: `url(${bannerImages[currentIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "32px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    backgroundColor: "transparent",
    color: "var(--primary)",
    border: "none",
    padding: "0 12px",
    cursor: "pointer",
    zIndex: 1,
  };

  const indicatorStyle = {
    position: "absolute",
    bottom: "12px",
    display: "flex",
    gap: "8px",
  };

  // 인디케이터 스타일
  const dotStyle = (index) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor:
      currentIndex === index ? "var(--primary)" : "var(--primary-100)",
    cursor: "pointer",
  });

  return (
    <div style={bannerStyle}>
      {/* 왼쪽 버튼 */}
      <button style={{ ...buttonStyle, left: "10px" }} onClick={goToPrev}>
        &#8249;
      </button>

      {/* 오른쪽 버튼 */}
      <button style={{ ...buttonStyle, right: "10px" }} onClick={goToNext}>
        &#8250;
      </button>

      {/* 인디케이터 */}
      <div style={indicatorStyle}>
        {bannerImages.map((_, index) => (
          <div
            key={index}
            style={dotStyle(index)}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
