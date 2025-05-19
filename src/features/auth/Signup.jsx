import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Signup.css";
import googleIcon from "./images/google_logo.png";
import kakaoIcon from "./images/kakao_logo.png";
import naverIcon from "./images/naver_logo.png";
import BackgroundBlob from "./components/BackgroundBlob";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input signup-email-input"
              />
              <button className="signup-button signup-dup-btn">
                중복 확인
              </button>
            </div>
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

          {/* 가입 버튼 */}
          <button className="signup-button signup-submit-btn">
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
            <SocialButton icon={googleIcon} alt="구글로 시작" />
            <SocialButton icon={kakaoIcon} alt="카카오로 시작" />
            <SocialButton icon={naverIcon} alt="네이버로 시작" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, alt }) => (
  <button className="signup-social-btn signup-social-icon-btn">
    <img src={icon} alt={alt} className="signup-social-icon-only" />
    <span className="signup-social-label">{alt}</span>
  </button>
);

export default Signup;
