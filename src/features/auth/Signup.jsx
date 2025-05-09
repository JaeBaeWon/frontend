import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      {/* 상단 문구 - 카드 외부 */}
      <h1
        style={{
          fontSize: "28px",
          fontStyle: "italic",
          position: "absolute",
          top: "40px",
          color: "#fff",
          textAlign: "center",
          width: "100%",
          letterSpacing: "-0.5px",
        }}
      ></h1>

      {/* 카드 */}
      <div
        style={{
          width: "440px",
          padding: "40px 36px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          marginTop: "70px", // 간격 줄임
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
          회원가입
        </h2>

        {/* 성명 */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
          >
            성명
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ ...inputStyle, fontSize: "16px" }}
          />
        </div>

        {/* 이메일 */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
          >
            이메일
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...inputStyle, flex: 1, fontSize: "16px" }}
            />
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "var(--primary)",
                height: "48px",
                fontWeight: "600",
              }}
            >
              중복 확인
            </button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
          >
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, fontSize: "16px" }}
          />
        </div>

        {/* 가입 버튼 */}
        <button
          style={{
            ...buttonStyle,
            width: "100%",
            backgroundColor: "var(--primary)",
            height: "48px",
            fontWeight: 600,
            fontSize: "16px",
            marginTop: "8px",
          }}
        >
          가입 완료하기
        </button>

        {/* 링크 문구 */}
        <p
          style={{
            textAlign: "left",
            marginTop: "12px",
            marginBottom: 0,
            color: "#888",
            fontSize: "14px",
          }}
        >
          이미 계정이 있으신가요?{" "}
          <Link
            to="/login"
            style={{
              color: "#888",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            로그인
          </Link>
        </p>
        <p
          style={{
            textAlign: "left",
            marginTop: "4px",
            marginBottom: 0,
            color: "#888",
            fontSize: "14px",
          }}
        >
          계정을 잊으셨나요?{" "}
          <Link
            to="/findemail"
            style={{
              color: "#888",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            이메일 찾기
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
          간편 회원가입하기
        </p>

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

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "0 16px",
  borderRadius: "4px",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
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

export default Signup;
