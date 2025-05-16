import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [sentCode, setSentCode] = useState(false);

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

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email || !phone || !birthdate) {
      alert("아이디, 전화번호, 생년월일을 모두 입력해주세요.");
      return;
    }

    try {
      const formattedDate = `${birthdate.slice(0, 4)}-${birthdate.slice(4, 6)}-${birthdate.slice(6, 8)}`;
      await axios.post("/auth/reset-password/send-code", {
        email,
        phone,
        birthday: formattedDate,
      });
      alert("인증번호가 전송되었습니다.");
      setSentCode(true);
    } catch (err) {
      console.error("인증번호 전송 실패", err.response?.data || err.message);
      alert("인증번호 전송 실패: " + (err.response?.data || "서버 오류"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sentCode) {
      alert("먼저 인증번호를 전송해주세요.");
      return;
    }

    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("/auth/reset-password", {
        email,
        phone,
        code: verifyCode,
        newPassword: newPw,
      });

      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login");
    } catch (err) {
      console.error("비밀번호 변경 실패", err.response?.data || err.message);
      alert("비밀번호 변경 실패: " + (err.response?.data || "서버 오류"));
    }
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={titleStyle}>비밀번호 재설정</h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>아이디</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>전화번호</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              placeholder="01012345678"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>생년월일</label>
            <input
              type="text"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              style={inputStyle}
              placeholder="YYYYMMDD"
            />
          </div>

          <button
            onClick={handleSendCode}
            type="button"
            style={{ ...buttonStyle, marginBottom: "8px" }}
          >
            인증번호 전송
          </button>

          <div style={fieldStyle}>
            <label style={labelStyle}>인증번호</label>
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
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
            <label style={labelStyle}>비밀번호 확인</label>
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
            개인정보나 쉬운 비밀번호는 피해주세요.
          </p>

          <button type="submit" style={buttonStyle}>
            비밀번호 변경
          </button>

          <button
            type="button"
            style={{ ...buttonStyle, backgroundColor: "#3f51b5" }}
            onClick={() => navigate("/login")}
          >
            로그인 화면으로 이동
          </button>
        </form>
      </div>
    </div>
  );
}

// CSS 스타일 유지
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
