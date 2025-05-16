import React, { useState } from "react";
import { Link } from "react-router-dom";
import InteractiveGrid from "./components/InteractiveGrid";
import "./Login.css";
import googleIcon from "./images/google_logo.png";
import kakaoIcon from "./images/kakao_logo.png";
import naverIcon from "./images/naver_logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    let hasError = false;
    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }
    if (hasError) return;
    // 실제 로그인 로직...
  };

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

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label className="login-label">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`login-input${emailError ? " input-error" : ""}`}
                autoComplete="email"
              />
              {emailError && (
                <div className="input-error-message">
                  아이디를 입력해 주세요
                </div>
              )}
            </div>
            <div className="login-field">
              <label className="login-label">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`login-input${passwordError ? " input-error" : ""}`}
                autoComplete="current-password"
              />
              {passwordError && (
                <div className="input-error-message">
                  비밀번호를 입력해 주세요
                </div>
              )}
            </div>
            <button className="login-button" type="submit">
              로그인
            </button>

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
              <SocialButton icon={googleIcon} alt="구글 로그인" />
              <SocialButton icon={kakaoIcon} alt="카카오 로그인" />
              <SocialButton icon={naverIcon} alt="네이버 로그인" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, alt }) => (
  <button className="login-social-btn login-social-icon-btn">
    <img src={icon} alt={alt} className="login-social-icon-only" />
    <span className="login-social-label">{alt}</span>
  </button>
);

export default Login;
