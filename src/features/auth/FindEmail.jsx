import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FindEmail.css";
import GridFloat from "./components/GridFloat";

function FindEmailPage() {
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showVerifyInput) {
      // 인증번호 입력 후 확인 버튼 클릭 시
      // 실제 인증번호 검증 로직 필요
      navigate("/emailfound");
    } else {
      // 인증번호 입력 전 확인 버튼 클릭 시
      console.log("생년월일:", birthdate);
      console.log("휴대폰 번호:", phoneNumber);
    }
  };

  const handleSendVerify = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setPhoneError("휴대폰 번호를 입력해주세요");
      setShowVerifyInput(false);
      return;
    }
    setPhoneError("");
    // 실제 인증번호 발송 로직 필요
    setShowVerifyInput(true);
  };

  return (
    <div className="findemail-outer">
      <GridFloat />
      <div className="login-bg-overlay"></div>
      <button
        className="back-btn"
        onClick={() => navigate("/login")}
        type="button"
      >
        ← 돌아가기
      </button>
      <div className="findemail-container">
        <div className="findemail-card">
          <form onSubmit={handleSubmit}>
            <h2 className="findemail-title">아이디 찾기</h2>
            <div className="findemail-field">
              <label className="findemail-label">생년월일</label>
              <input
                type="text"
                placeholder="생년월일 8자리 [YYYYMMDD]"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="findemail-input"
              />
            </div>
            <div className="findemail-field">
              <label className="findemail-label">
                가입 시 인증한 휴대폰 번호 입력
              </label>
              <div className="findemail-phone-row">
                <input
                  type="text"
                  placeholder="휴대폰 번호 입력( - 없이 입력)"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                  className="findemail-input findemail-phone-input"
                />
                <button
                  className={`findemail-button findemail-verify-btn${
                    phoneNumber ? " active" : ""
                  }`}
                  onClick={handleSendVerify}
                  type="button"
                  disabled={!phoneNumber}
                >
                  인증
                </button>
              </div>
              {phoneError && (
                <div className="findemail-error">{phoneError}</div>
              )}
            </div>
            {showVerifyInput && (
              <div className="findemail-field">
                <label className="findemail-label">인증번호 입력</label>
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="findemail-input"
                />
              </div>
            )}
            <button type="submit" className="findemail-button">
              확인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindEmailPage;
