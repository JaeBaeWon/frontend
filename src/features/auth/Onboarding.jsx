import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlob from "./components/BackgroundBlob";
import "./Signup.css";
import "./Onboarding.css";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

export default function Onboarding() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [birth, setBirth] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.daum || !window.daum.Postcode) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openDaumPostcode = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("카카오 주소 검색 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        setZipCode(data.zonecode);
        setStreetAddress(addr);
        document.getElementById("detailAddress")?.focus();
      },
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formattedBirth = birth.trim().replaceAll("/", "-");
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(formattedBirth);

    if (!gender || !phone || !streetAddress || !detailAddress || !zipCode || !birth) return;
    if (!isValidDate) {
      alert("생년월일을 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    const payload = {
      gender: gender === "male" ? "MALE" : "FEMALE",
      phone,
      zipCode,
      streetAdr: streetAddress,
      detailAdr: detailAddress,
      birthDate: formattedBirth,
    };

    try {
      await axios.post(`${API_BASE_URL}/auth/onboarding`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      alert("온보딩 정보가 저장되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("❌ 온보딩 제출 실패:", err.response?.data || err.message);
      alert("제출 실패: 정보를 다시 확인해주세요.");
    }
  };

  return (
    <div className="signup-container">
      <BackgroundBlob />
      <div className="signup-card-wrapper">
        <div className="signup-card">
          <h2 className="signup-title">추가 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            {/* 성별 */}
            <div className="signup-field" style={{ marginBottom: 24 }}>
              <label className="signup-label">성별</label>
              <div style={{ display: "flex", gap: 16 }}>
                <label className="onboarding-radio-label">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="onboarding-radio"
                  />
                  남성
                </label>
                <label className="onboarding-radio-label">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="onboarding-radio"
                  />
                  여성
                </label>
              </div>
              {submitted && !gender && <div className="onboarding-error">성별을 선택해 주세요.</div>}
            </div>

            {/* 전화번호 */}
            <div className="signup-field">
              <label className="signup-label">전화번호</label>
              <input
                className={`signup-input${submitted && !phone ? " onboarding-input-error" : ""}`}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              />
              {submitted && !phone && <div className="onboarding-error">전화번호를 입력해 주세요.</div>}
            </div>

            {/* 주소 */}
            <div className="signup-field">
              <label className="signup-label">주소</label>
              <div className="address-row" style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  className="signup-input"
                  placeholder="우편번호"
                  value={zipCode}
                  readOnly
                />
                <button type="button" className="signup-button" onClick={openDaumPostcode}>
                  주소 찾기
                </button>
              </div>
              <input
                type="text"
                className="signup-input"
                placeholder="도로명 주소"
                value={streetAddress}
                readOnly
              />
              <input
                type="text"
                id="detailAddress"
                className="signup-input"
                placeholder="상세 주소"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
              />
              {submitted && (!zipCode || !streetAddress || !detailAddress) && (
                <div className="onboarding-error">주소를 모두 입력해 주세요.</div>
              )}
            </div>

            {/* 생년월일 */}
            <div className="signup-field">
              <label className="signup-label">생년월일</label>
              <input
                className={`signup-input${submitted && !birth ? " onboarding-input-error" : ""}`}
                type="text"
                placeholder="YYYY-MM-DD"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
              {submitted && !birth && <div className="onboarding-error">생년월일을 입력해 주세요.</div>}
            </div>

            <button
              type="submit"
              className="signup-button signup-submit-btn"
              disabled={!(gender && phone && zipCode && streetAddress && detailAddress && birth)}
              style={{ marginTop: 16 }}
            >
              제출하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
