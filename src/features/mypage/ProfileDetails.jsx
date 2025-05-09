import React, { useState } from "react";

function ProfileDetails() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");

  const handlePhoneChange = (e) => {
    // 숫자만 입력
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <form style={formStyle}>
          <h2 style={titleStyle}>회원 정보 입력</h2>
          {/* 성별 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>성별</label>
            <div style={genderGroupStyle}>
              <button
                type="button"
                style={gender === "male" ? genderButtonActive : genderButton}
                onClick={() => setGender("male")}
              >
                남
              </button>
              <button
                type="button"
                style={gender === "female" ? genderButtonActive : genderButton}
                onClick={() => setGender("female")}
              >
                여
              </button>
            </div>
          </div>
          {/* 전화번호 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>전화번호</label>
            <input
              type="text"
              placeholder="숫자만 입력"
              value={phone}
              onChange={handlePhoneChange}
              style={inputStyle}
              maxLength={11}
            />
          </div>
          {/* 주소 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>주소</label>
            <input
              type="text"
              placeholder="주소를 입력하세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />
          </div>
          {/* 생년월일 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>생년월일</label>
            <input
              type="text"
              placeholder="YYYY/MM/DD"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              style={inputStyle}
              maxLength={10}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            저장
          </button>
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
  width: "480px",
  minWidth: "320px",
  backgroundColor: "var(--primary-300)",
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

const genderGroupStyle = {
  display: "flex",
  gap: "12px",
};

const genderButton = {
  flex: 1,
  padding: "14px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fafafa",
  color: "#888",
  fontWeight: 500,
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "all 0.2s",
};

const genderButtonActive = {
  ...genderButton,
  background: "var(--primary)",
  color: "#fff",
  border: "1px solid var(--primary)",
  fontWeight: 700,
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

export default ProfileDetails;
