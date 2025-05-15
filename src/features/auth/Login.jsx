import React, { useState } from "react";
import { Link } from "react-router-dom";
import InteractiveGrid from "./components/InteractiveGrid";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      {/* 좌측: 텍스트 + 그리드 */}
      <div className="login-left">
        <InteractiveGrid />
      </div>

      {/* 우측: 로그인 */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">로그인</h2>

          <div className="login-field">
            <label className="login-label">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label className="login-label">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              autoComplete="current-password"
            />
          </div>

          <button className="login-button">로그인</button>

          <p className="login-linktext">
            아직 계정이 없으신가요?{" "}
            <Link to="/signup" className="login-link">
              회원가입
            </Link>
          </p>
          <p className="login-linktext" style={{ marginTop: 4 }}>
            비밀번호를 잊으셨나요?{" "}
            <Link to="/resetpassword" className="login-link">
              비밀번호 재설정
            </Link>
          </p>

          <hr className="login-divider" />
          <p className="login-social-title">간편 로그인하기</p>

          <div className="login-social-row">
            <SocialButton label="구글" />
            <SocialButton label="카카오" />
            <SocialButton label="네이버" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ label }) => (
  <button className="login-social-btn">{label}</button>
);

export default Login;
