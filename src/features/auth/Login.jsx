import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const outerStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "var(--primary)",
  fontFamily: "Pretendard, sans-serif",
};

const boxStyle = {
  width: "100%",
  maxWidth: "440px",
  padding: "40px 36px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
  margin: "40px 20px",
};

const titleStyle = {
  fontWeight: "bold",
  fontSize: "24px",
  marginBottom: "32px",
  textAlign: "center",
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

const loginButtonStyle = {
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const accessToken = res.data.accessToken;
      const onboardingDone = res.data.onboardingComplete;

      localStorage.setItem("accessToken", accessToken);

      // ✅ 응답에서 onboarding 여부로 분기
      if (!onboardingDone) {
        navigate("/profiledetails");
      } else {
        navigate("/mypage");
      }
    } catch (err) {
      console.error("❌ 로그인 실패:", err.response?.data || err.message);
      alert("로그인에 실패했습니다.");
    }
  };


  return (
    <div style={outerStyle}>
      <div style={boxStyle}>
        <h2 style={titleStyle}>로그인</h2>

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

        <button onClick={handleLogin} style={loginButtonStyle}>
          로그인
        </button>

        <p style={linkTextStyle}>
          아직 계정이 없으신가요?{" "}
          <Link to="/signup" style={linkStyle}>회원가입</Link>
        </p>
        <p style={{ ...linkTextStyle, marginTop: "4px" }}>
          비밀번호를 잊으셨나요?{" "}
          <Link to="/resetpassword" style={linkStyle}>비밀번호 재설정</Link>
        </p>

        <hr style={{ margin: "24px 0" }} />
        <p style={{ textAlign: "center", marginBottom: "8px", fontWeight: "600" }}>
          간편 로그인하기
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
          <SocialButton label="구글" provider="google" />
          <SocialButton label="카카오" provider="kakao" />
          <SocialButton label="네이버" provider="naver" />
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ label, provider }) => {
  const handleSocialLogin = () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <button
      onClick={handleSocialLogin}
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
};

export default Login;
