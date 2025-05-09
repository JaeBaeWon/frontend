import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "var(--primary)",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "40px 36px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          margin: "40px 20px",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          로그인
        </h2>

        {/* 이메일 입력 */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            autoComplete="email"
          />
        </div>

        {/* 비밀번호 입력 (기본 눈 아이콘만 사용) */}
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
          />
        </div>

        {/* 로그인 버튼 */}
        <button
          style={{
            width: "100%",
            height: "48px",
            backgroundColor: "var(--primary)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            marginTop: "8px",
            cursor: "pointer",
          }}
        >
          로그인
        </button>

        {/* 링크 안내 */}
        <p style={linkTextStyle}>
          아직 계정이 없으신가요?{" "}
          <Link to="/signup" style={linkStyle}>
            회원가입
          </Link>
        </p>
        <p style={{ ...linkTextStyle, marginTop: "4px" }}>
          비밀번호를 잊으셨나요?{" "}
          <Link to="/resetpassword" style={linkStyle}>
            비밀번호 재설정
          </Link>
        </p>

        <hr style={{ margin: "24px 0" }} />
        <p
          style={{
            textAlign: "center",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          간편 로그인하기
        </p>

        {/* 간편 로그인 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <SocialButton label="구글" />
          <SocialButton label="카카오" />
          <SocialButton label="네이버" />
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 500,
  fontSize: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const linkTextStyle = {
  textAlign: "left",
  marginTop: "12px",
  marginBottom: 0,
  color: "#888",
  fontSize: "14px",
};

const linkStyle = {
  fontWeight: 500,
  textDecoration: "underline",
  color: "#888",
};

const SocialButton = ({ label }) => (
  <button
    style={{
      flex: 1,
      border: "1px solid #ccc",
      borderRadius: "6px",
      height: "44px",
      fontSize: "15px",
      background: "#fff",
      cursor: "pointer",
    }}
  >
    {label}
  </button>
);

export default Login;
