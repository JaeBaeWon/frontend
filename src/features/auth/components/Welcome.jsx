import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // 스타일 따로 관리

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signup/onboarding"); // ✅ 4초 후 온보딩 페이지로 이동
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <h1>
          포도피커에 오신 것을 환영합니다. 마음에 드는 공연을 쉽고 빠르게
          예매하세요!
        </h1>
        <p>원활한 예매를 위해 추가 정보를 입력해 주세요.</p>
      </div>
    </div>
  );
};

export default Welcome;
