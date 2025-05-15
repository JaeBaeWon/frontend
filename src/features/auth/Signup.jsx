import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signup-container">
      {/* 상단 문구 - 카드 외부 */}
      <h1 className="signup-top-title"></h1>

      {/* 카드 */}
      <div className="signup-card">
        <h2 className="signup-title">회원가입</h2>

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
            <button className="signup-button signup-dup-btn">중복 확인</button>
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
          <SocialButton label="구글" />
          <SocialButton label="카카오" />
          <SocialButton label="네이버" />
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ label }) => (
  <button className="signup-social-btn">{label}</button>
);

export default Signup;
