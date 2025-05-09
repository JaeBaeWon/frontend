import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={containerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={titleStyle}>비밀번호 재설정</h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>현재 비밀번호</label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>새 비밀번호</label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              style={inputStyle}
            />
            <ul style={pwRuleListStyle}>
              {pwRules.map((rule, idx) => (
                <li
                  key={idx}
                  style={{
                    color: rule.valid ? "#4caf50" : "#d32f2f",
                    fontWeight: rule.valid ? 600 : 400,
                    fontSize: "0.98rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ fontSize: "1.1em" }}>
                    {rule.valid ? "✔️" : "❌"}
                  </span>
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              style={inputStyle}
            />
          </div>

          <p style={infoTextStyle}>
            8~16자의 영문 대/소문자, 숫자, 특수기호를 조합하여 사용해주세요.
            <br />
            개인정보나 연속된 키보드 배열과 같은 쉬운 비밀번호는 보안에 취약하니
            피해주세요.
          </p>

          <button type="submit" style={buttonStyle}>
            확인
          </button>
        </form>
      </div>
    </div>
  );
}

// 스타일 정의
const containerStyle = {
  display: "flex",
  minHeight: "100dvh",
  width: "100vw",
  fontFamily: "Pretendard, sans-serif",
};

const leftStyle = {
  flex: 1,
  backgroundColor: "var(--primary)",
};

const rightStyle = {
  flex: 1,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formStyle = {
  width: "100%",
  maxWidth: "480px",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
  padding: "0 16px",
};

const titleStyle = {
  fontWeight: "bold",
  fontSize: "2rem",
  marginBottom: "8px",
  textAlign: "left",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const labelStyle = {
  fontWeight: 600,
  fontSize: "1.1rem",
  marginBottom: "2px",
};

const inputStyle = {
  width: "100%",
  padding: "16px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1.1rem",
  boxSizing: "border-box",
  background: "#fafafa",
};

const buttonStyle = {
  width: "100%",
  height: "52px",
  backgroundColor: "var(--primary)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.1rem",
  borderRadius: "8px",
  border: "none",
  marginTop: "8px",
  cursor: "pointer",
};

const infoTextStyle = {
  fontSize: "13px",
  color: "#666",
  lineHeight: 1.7,
  marginTop: "-4px",
  marginBottom: "8px",
};

const pwRuleListStyle = {
  listStyle: "none",
  padding: 0,
  margin: "8px 0 0 0",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

export default ResetPassword;
