import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // 스타일 따로 관리

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signup/onboarding"); // ✅ 2초 후 온보딩 페이지로 이동
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <h1>포도피커에 오신 것을 환영합니다 🍇</h1>
        <p>우리, 조금 더 친해져볼까요?</p>
      </div>
    </div>
  );
};

export default Welcome;
