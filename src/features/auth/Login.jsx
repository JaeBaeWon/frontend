// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";
import GridFloat from "./components/GridFloat";
import googleIcon from "./images/google_logo.png";
import kakaoIcon from "./images/kakao_logo.png";
import naverIcon from "./images/naver_logo.png";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;
const recaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Google test key

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
    if (!recaptchaToken) {
      alert("'로봇이 아닙니다'를 체크해주세요.");
      return;
    }
    if (hasError) return;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
          recaptchaToken,
        },
        { withCredentials: true }
      );

      const accessToken = res.data.accessToken;
      const onboardingDone = res.data.onboardingComplete;

      localStorage.setItem("accessToken", accessToken);
      const redirect = res.data.redirectUrl;
      navigate(redirect);
    } catch (err) {
      console.error("\u274C 로그인 실패:", err.response?.data || err.message);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-center-container">
      <GridFloat />
      <div className="login-bg-overlay"></div>
      <Link to="/" className="signup-home-link">
        ← 메인으로
      </Link>
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
            {emailError && <div className="input-error-message">아이디를 입력해 주세요</div>}
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
            {passwordError && <div className="input-error-message">비밀번호를 입력해 주세요</div>}
          </div>

          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>

          <button className="login-button" type="submit">
            로그인
          </button>
          <p className="login-linktext">
            처음 방문하셨나요? <Link to="/signup" className="login-link">회원가입</Link>
          </p>
          <p className="login-linktext" style={{ marginTop: 4 }}>
            아이디를 잊으셨나요? <Link to="/findemail" className="login-link">아이디 찾기</Link>
          </p>
          <p className="login-linktext" style={{ marginTop: 4 }}>
            비밀번호를 잊으셨나요? <Link to="/resetpassword" className="login-link">비밀번호 재설정</Link>
          </p>
          <hr className="login-divider" />
          <p className="login-social-title">간편 로그인하기</p>
          <div className="login-social-row">
            <SocialButton icon={googleIcon} alt="구글 로그인" provider="google" />
            <SocialButton icon={kakaoIcon} alt="카카오 로그인" provider="kakao" />
            <SocialButton icon={naverIcon} alt="네이버 로그인" provider="naver" />
          </div>
        </form>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, alt, provider }) => {
  const handleSocialLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <button className="login-social-btn login-social-icon-btn" onClick={handleSocialLogin}>
      <img src={icon} alt={alt} className="login-social-icon-only" />
      <span className="login-social-label">{alt}</span>
    </button>
  );
};

export default Login;