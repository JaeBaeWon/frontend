import React from "react";
import { useNavigate } from "react-router-dom";
import "./ResetComplete.css";

function ResetComplete() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleFindEmailClick = () => {
    navigate("/findemail");
  };

  return (
    <div className="resetc-container">
      <div className="resetc-left"></div>
      <div className="resetc-right">
        <div className="resetc-content">
          <h2 className="resetc-title">비밀번호 변경 완료</h2>
          <div className="resetc-icon-circle">
            <span className="resetc-check-icon">✓</span>
          </div>
          <p className="resetc-desc">
            비밀번호 변경이 완료되었습니다.
            <br />
            새로운 비밀번호로 로그인 해주세요.
          </p>
          <button onClick={handleLoginClick} className="resetc-button">
            로그인 하기
          </button>
          <p onClick={handleFindEmailClick} className="resetc-muted-link">
            아이디 찾기
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetComplete;
