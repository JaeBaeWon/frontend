import { useState } from "react";
import "./AdBanner.css";

export default function AdBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="ad-banner-wrapper">
      <div className="ad-banner">
        <div className="ad-text">
          🏷️ 카카오페이 전용 혜택! 결제 즉시 2,000원 캐시백 + 간편 예매
        </div>
        <button className="close-btn" onClick={handleClose}>
          ✖
        </button>
      </div>
    </div>
  );
}
