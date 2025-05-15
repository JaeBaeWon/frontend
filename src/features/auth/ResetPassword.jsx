import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // 비밀번호 규칙 체크
  const isLengthValid = newPw.length >= 8 && newPw.length <= 16;
  const hasUpper = /[A-Z]/.test(newPw);
  const hasLower = /[a-z]/.test(newPw);
  const hasNumber = /[0-9]/.test(newPw);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPw);

  const pwRules = [
    { label: "8~16자", valid: isLengthValid },
    { label: "영문 대문자 포함", valid: hasUpper },
    { label: "영문 소문자 포함", valid: hasLower },
    { label: "숫자 포함", valid: hasNumber },
    { label: "특수문자 포함", valid: hasSpecial },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 실제 비밀번호 변경 요청 API 연결
    navigate("/resetcomplete");
  };

  return (
    <div className="resetpw-container">
      <div className="resetpw-left"></div>
      <div className="resetpw-right">
        <form onSubmit={handleSubmit} className="resetpw-form">
          <h2 className="resetpw-title">비밀번호 재설정</h2>

          <div className="resetpw-field">
            <label className="resetpw-label">현재 비밀번호</label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className="resetpw-input"
            />
          </div>

          <div className="resetpw-field">
            <label className="resetpw-label">새 비밀번호</label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="resetpw-input"
            />
            <ul className="resetpw-pwrule-list">
              {pwRules.map((rule, idx) => (
                <li
                  key={idx}
                  className={
                    rule.valid ? "resetpw-pwrule valid" : "resetpw-pwrule"
                  }
                >
                  <span className="resetpw-pwrule-icon">
                    {rule.valid ? "✔️" : "❌"}
                  </span>
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="resetpw-field">
            <label className="resetpw-label">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="resetpw-input"
            />
          </div>

          <p className="resetpw-info-text">
            8~16자의 영문 대/소문자, 숫자, 특수기호를 조합하여 사용해주세요.
            <br />
            개인정보나 연속된 키보드 배열과 같은 쉬운 비밀번호는 보안에 취약하니
            피해주세요.
          </p>

          <button type="submit" className="resetpw-button">
            확인
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
