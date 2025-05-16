import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function FindEmailSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "unknown@example.com";

  return (
    <div style={containerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <div style={contentStyle}>
          <h2 style={titleStyle}>아이디 찾기 완료</h2>
          <div style={iconCircleStyle}>
            <span style={checkIcon}>✓</span>
          </div>
          <div style={descriptionStyle}>
            <p style={textStyle}>입력하신 정보와 일치하는 이메일입니다.</p>
            <p style={emailStyle}>{userEmail}</p>
          </div>
          <button style={buttonStyle} onClick={() => navigate("/login")}>
            로그인 하기
          </button>
          <div style={textLinkWrapper}>
            <Link to="/resetpassword" style={textLinkStyle}>
              비밀번호 재설정
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 💄 스타일 정의
const containerStyle = {
  display: "flex",
  minHeight: "100dvh",
  width: "100vw",
  fontFamily: "Pretendard, sans-serif",
};

const leftStyle = {
  width: "480px",
  minWidth: "320px",
  backgroundColor: "var(--primary)",
};

const rightStyle = {
  flex: 1,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
};

const contentStyle = {
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "18px",
  padding: "0 16px",
};

const titleStyle = {
  fontWeight: "bold",
  fontSize: "2rem",
  alignSelf: "flex-start",
  marginBottom: "8px",
};

const iconCircleStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "var(--primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 auto 8px auto",
};

const checkIcon = {
  fontSize: "2rem",
  color: "#fff",
};

const descriptionStyle = {
  marginTop: "0",
  padding: "0 8px",
  lineHeight: 1.6,
};

const textStyle = {
  fontSize: "1rem",
  color: "#333",
  marginBottom: "8px",
};

const emailStyle = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#222",
  backgroundColor: "var(--primary)",
  padding: "10px 16px",
  borderRadius: "6px",
  marginBottom: "12px",
};

const buttonStyle = {
  width: "100%",
  height: "48px",
  backgroundColor: "var(--primary)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.1rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginBottom: "8px",
};

const textLinkWrapper = {
  width: "100%",
  textAlign: "right",
};

const textLinkStyle = {
  fontSize: "1rem",
  color: "#666",
  textDecoration: "underline",
  cursor: "pointer",
};

export default FindEmailSuccess;
