import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !name || !password || !passwordCheck) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("/auth/join", {
        email,
        user_name: name,
        password,
        passwordCheck,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패", err.response?.data || err.message);
      alert("회원가입 실패: " + (err.response?.data || "서버 오류"));
    }
  };

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
          width: "440px",
          padding: "40px 36px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          marginTop: "70px",
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
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>
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
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ ...inputStyle, width: "100%", fontSize: "16px" }}
          />
        </div>

        {/* 비밀번호 */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, fontSize: "16px" }}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>
            비밀번호 확인
          </label>
          <input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            style={{ ...inputStyle, fontSize: "16px" }}
          />
        </div>

        {/* 가입 버튼 */}
        <button
          onClick={handleSignup}
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

        {/* 안내 링크 */}
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
          <Link to="/login" style={linkStyle}>
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
          <Link to="/findemail" style={linkStyle}>
            이메일 찾기
          </Link>
        </p>

        <hr style={{ margin: "24px 0" }} />
        <p style={{ textAlign: "center", marginBottom: "8px", fontWeight: "600" }}>
          간편 회원가입하기
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
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

const linkStyle = {
  color: "#888",
  textDecoration: "underline",
  fontWeight: 500,
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
