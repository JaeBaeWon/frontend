import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./FindEmailSuccess.css";

function FindEmailSuccess() {
  const navigate = useNavigate();
  const userEmail = "podopicker@gmail.com"; // 실제 데이터로 교체 예정

  return (
    <div className="fes-container">
      <div className="fes-left"></div>
      <div className="fes-right">
        <div className="fes-content">
          <h2 className="fes-title">아이디 찾기 완료</h2>
          <div className="fes-icon-circle">
            <span className="fes-check-icon">✓</span>
          </div>
          <div className="fes-description">
            <p className="fes-text">입력하신 정보와 일치하는 이메일입니다.</p>
            <p className="fes-email">{userEmail}</p>
          </div>
          <button className="fes-button" onClick={() => navigate("/login")}>
            로그인 하기
          </button>
          <div className="fes-text-link-wrapper">
            <Link to="/resetpassword" className="fes-text-link">
              비밀번호 재설정
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindEmailSuccess;
