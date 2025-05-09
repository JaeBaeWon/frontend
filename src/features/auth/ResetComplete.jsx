import React from "react";
import { useNavigate } from "react-router-dom";

function ResetComplete() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleFindEmailClick = () => {
    navigate("/findemail");
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <div style={contentStyle}>
          <h2 style={titleStyle}>비밀번호 재설정</h2>
          <div style={iconCircleStyle}>
            <span style={checkIcon}>✓</span>
          </div>
          <p style={descStyle}>
            비밀번호 변경이 완료되었습니다.
            <br />
            새로운 비밀번호로 로그인 해주세요.
          </p>
          <button onClick={handleLoginClick} style={buttonStyle}>
            로그인 하기
          </button>
          <p onClick={handleFindEmailClick} style={mutedLinkStyle}>
            아이디 찾기
          </p>
        </div>
      </div>
    </div>
  );
}

// 스타일 정의
const containerStyle = {
  display: "flex",
  minHeight: "100dvh",
  width: "100vw",
  fontFamily: "Pretendard, sans-serif",
};

const leftStyle = {
  flex: 1,
  backgroundColor: "var(--primary)",
};

const rightStyle = {
  flex: 1,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const contentStyle = {
  width: "100%",
  maxWidth: "480px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
};

const titleStyle = {
  fontWeight: "bold",
  fontSize: "2rem",
  alignSelf: "flex-start",
};

const iconCircleStyle = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  backgroundColor: "var(--primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "36px",
  fontWeight: "bold",
  margin: "0 auto 24px auto",
};

const checkIcon = {
  fontSize: "2rem",
  color: "#fff",
};

const descStyle = {
  fontSize: "0.95rem",
  color: "#333",
  lineHeight: 1.6,
  textAlign: "center",
  padding: "0 8px",
};

const buttonStyle = {
  width: "100%",
  height: "48px",
  backgroundColor: "var(--primary)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginBottom: "12px",
};

const mutedLinkStyle = {
  fontSize: "0.95rem",
  color: "#999", // 회색
  cursor: "pointer",
};

export default ResetComplete;
