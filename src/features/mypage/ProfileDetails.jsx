import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfileDetails() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [birth, setBirth] = useState("");

  // ✅ Daum 주소 API 스크립트 로딩
  useEffect(() => {
    if (!window.daum || !window.daum.Postcode) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };

  const openDaumPostcode = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("카카오 주소 검색 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = "";
        let extraAddr = "";

        addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr += (extraAddr !== "" ? ", " + data.buildingName : data.buildingName);
          }
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
        }

        setZipCode(data.zonecode);
        setStreetAddress(addr);
        setExtraAddress(extraAddr);
        document.getElementById("detailAddress")?.focus();
      },
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "/auth/onboarding",
        {
          gender: gender === "male" ? "MALE" : "FEMALE",
          phone,
          zipCode,
          streetAdr: streetAddress,
          detailAdr: detailAddress,
          birthDate: birth.replaceAll("/", "-"),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      alert("온보딩 정보가 저장되었습니다.");
      window.location.href = "/mypage";
    } catch (err) {
      console.error("❌ 온보딩 제출 실패:", err.response?.data || err.message);
      alert("제출에 실패했습니다. 정보를 다시 확인해주세요.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
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
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="우편번호"
                value={zipCode}
                style={{ ...inputStyle, flex: 1 }}
                readOnly
              />
              <button type="button" onClick={openDaumPostcode} style={{ ...buttonStyle, width: "120px" }}>
                주소 찾기
              </button>
            </div>
            <input type="text" placeholder="도로명 주소" value={streetAddress} style={inputStyle} readOnly />
            <input
              type="text"
              id="detailAddress"
              placeholder="상세 주소"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              style={inputStyle}
            />
            <input type="text" placeholder="참고 항목" value={extraAddress} style={inputStyle} readOnly />
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

          <button type="submit" style={buttonStyle}>저장</button>
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
};

const genderButtonActive = {
  ...genderButton,
  background: "var(--primary)",
  color: "#fff",
  border: "1px solid var(--primary)",
  fontWeight: 700,
};

const buttonStyle = {
  height: "48px",
  backgroundColor: "var(--primary)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

export default ProfileDetails;
