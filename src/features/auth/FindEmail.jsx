import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FindEmailPage() {
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const handleSendVerify = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !birthdate) {
      setPhoneError("생년월일과 전화번호를 모두 입력해주세요");
      setShowVerifyInput(false);
      return;
    }

    try {
      const formattedDate = `${birthdate.slice(0, 4)}-${birthdate.slice(4, 6)}-${birthdate.slice(6, 8)}`;
      const res = await axios.post("/auth/find-id/send-code", {
        phone: phoneNumber,
        birthday: formattedDate,
      });

      console.log("✅ 인증번호 전송 성공", res.data);
      setShowVerifyInput(true);
    } catch (err) {
      console.error("❌ 인증번호 전송 실패", err.response?.data || err.message);
      setPhoneError("인증번호 전송 실패: " + (err.response?.data || "서버 오류"));
      setShowVerifyInput(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showVerifyInput) {
      alert("먼저 인증번호를 전송해주세요.");
      return;
    }

    try {
      const res = await axios.post("/auth/find-id/verify-code", {
        phone: phoneNumber,
        code: verifyCode,
      });

      alert("당신의 아이디는: " + res.data);
      navigate("/emailfound", { state: { email: res.data } })
    } catch (err) {
      console.error("❌ 인증 실패", err.response?.data || err.message);
      alert("인증 실패: " + (err.response?.data || "서버 오류"));
    }
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={titleStyle}>아이디 찾기</h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>생년월일</label>
            <input
              type="text"
              placeholder="생년월일 8자리 [YYYYMMDD]"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>전화번호</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="휴대폰 번호 입력( - 없이 입력)"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (phoneError) setPhoneError("");
                }}
                style={{ ...inputStyle, flex: 1, marginTop: 0, height: "48px" }}
              />
              <button
                style={{
                  ...buttonStyle,
                  width: "120px",
                  height: "48px",
                  fontSize: "1rem",
                  padding: 0,
                  marginTop: 0,
                  borderRadius: "6px",
                  backgroundColor: phoneNumber ? "var(--primary)" : "#e0e0e0",
                  color: phoneNumber ? "#fff" : "#aaa",
                  cursor: phoneNumber ? "pointer" : "not-allowed",
                }}
                onClick={handleSendVerify}
                type="button"
                disabled={!phoneNumber}
              >
                인증번호 전송
              </button>
            </div>
            {phoneError && (
              <div style={{ color: "#e53935", fontSize: "0.98rem", marginTop: "6px" }}>
                {phoneError}
              </div>
            )}
          </div>

          {showVerifyInput && (
            <div style={fieldStyle}>
              <label style={labelStyle}>인증번호 입력</label>
              <input
                type="text"
                placeholder="인증번호 입력"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          <button type="submit" style={buttonStyle}>
            아이디 확인
          </button>
          <Link to="/login" style={linkButtonStyle}>
            로그인 화면으로 이동
          </Link>
        </form>
      </div>
    </div>
  );
}

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

const linkButtonStyle = {
  display: "block",
  width: "100%",
  padding: "0",
  backgroundColor: "transparent",
  border: "none",
  color: "#888",
  fontSize: "1.05rem",
  textAlign: "right",
  cursor: "pointer",
  textDecoration: "underline",
  marginTop: "4px",
};

export default FindEmailPage;
