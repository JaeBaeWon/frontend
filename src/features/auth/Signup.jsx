import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./Signup.css";
import googleIcon from "./images/google_logo.png";
import kakaoIcon from "./images/kakao_logo.png";
import naverIcon from "./images/naver_logo.png";
import BackgroundBlob from "./components/BackgroundBlob";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);   // 이메일 중복 확인

  const navigate = useNavigate();

  const checkEmailDuplicate = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/auth/check-duplicate`, {
        params: { email },
        withCredentials: true,      // 로봇검증
      });

      if (res.data.available) {
        alert("사용 가능한 이메일입니다.");
        setIsEmailAvailable(true);
      } else {
        alert("이미 사용 중인 이메일입니다.");
        setIsEmailAvailable(false);
      }
    } catch (err) {
      console.error("이메일 중복 확인 오류:", err);
      alert("중복 확인 중 오류가 발생했습니다.");
      setIsEmailAvailable(null);
    }
  };

  const handleSignup = async () => {
      if (!email || !name || !password || !passwordCheck) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (isEmailAvailable !== true) {
        alert("이메일 중복 확인을 완료해주세요.");
        return;
      }

      try {
        // 1. 회원가입 요청
        await axios.post(`${API_BASE_URL}/auth/join`, {
          email,
          user_name: name,
          password,
          passwordCheck,
        });

        // 2. 로그인 요청
        const loginRes = await axios.post(`${API_BASE_URL}/auth/login`, {
          email,
          password,
          recaptchaToken: "test", // 로컬 개발용
        }, { withCredentials: true });

        // 3. 토큰 저장
        localStorage.setItem("accessToken", loginRes.data.accessToken);

        // 4. 다음 페이지 이동
        navigate("/signup/welcome");

      } catch (err) {
        console.error("회원가입 실패", err.response?.data || err.message);
        alert("회원가입 실패: " + (err.response?.data || "서버 오류"));
      }
    };



  return (
    <div className="signup-container">
      <BackgroundBlob />
      <Link to="/" className="signup-home-link">
        ← 메인으로
      </Link>
      <div className="signup-card-wrapper">
        <div className="signup-card">
          <h2 className="signup-title">필수 정보를 입력해 주세요</h2>

          {/* 성명 */}
          <div className="signup-field">
            <label className="signup-label">성명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-input"
            />
          </div>

          {/* 이메일 */}
          <div className="signup-field">
            <label className="signup-label">이메일</label>
            <div className="signup-email-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailAvailable(null); // 이메일 변경 시 상태 초기화
                }}
                className={`signup-input signup-email-input ${isEmailAvailable === false ? "input-error" : ""}`}
              />
              <button
                className="signup-button signup-dup-btn"
                type="button"
                onClick={checkEmailDuplicate}
              >
                중복 확인
              </button>
            </div>
              {isEmailAvailable === false && (
                <div className="input-error-message">이미 사용 중인 이메일입니다.</div>
              )}
              {isEmailAvailable === true && (
                <div className="input-success-message">사용 가능한 이메일입니다.</div>
              )}
            </div>

          {/* 비밀번호 */}
          <div className="signup-field">
            <label className="signup-label">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
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
              className="signup-input"
            />
          </div>

          {/* 가입 버튼 */}
          <button className="signup-button signup-submit-btn" onClick={handleSignup}>
            가입 완료하기
          </button>

          {/* 링크 문구 */}
          <p className="signup-linktext">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="signup-link">
              로그인
            </Link>
          </p>
          <p className="signup-linktext" style={{ marginTop: 4 }}>
            계정을 잊으셨나요?{" "}
            <Link to="/findemail" className="signup-link">
              이메일 찾기
            </Link>
          </p>

          <hr className="signup-divider" />
          <p className="signup-social-title">간편 회원가입하기</p>

          <div className="signup-social-row">
            <SocialButton icon={googleIcon} alt="구글로 시작" provider="google" />
            <SocialButton icon={kakaoIcon} alt="카카오로 시작" provider="kakao" />
            <SocialButton icon={naverIcon} alt="네이버로 시작" provider="naver" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, alt, provider }) => {
  const handleSocialLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <button className="signup-social-btn signup-social-icon-btn" onClick={handleSocialLogin}>
      <img src={icon} alt={alt} className="signup-social-icon-only" />
      <span className="signup-social-label">{alt}</span>
    </button>
  );
};

export default Signup;
