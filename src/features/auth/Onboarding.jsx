import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlob from "./components/BackgroundBlob";
import "./Signup.css";
import "./Onboarding.css";

export default function Onboarding() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (gender && phone && address) {
      // 실제 제출 로직
      // navigate("/nextpage");
    }
  };

  return (
    <div className="signup-container">
      <BackgroundBlob />
      <div className="signup-card-wrapper">
        <div className="signup-card">
          <h2 className="signup-title">추가 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            <div className="signup-field" style={{ marginBottom: 24 }}>
              <label className="signup-label" style={{ marginBottom: 8 }}>
                성별
              </label>
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
              {submitted && !gender && (
                <div className="onboarding-error">성별을 선택해 주세요.</div>
              )}
            </div>
            <div className="signup-field">
              <label className="signup-label" htmlFor="phone">
                전화번호
              </label>
              <input
                id="phone"
                className={`signup-input${
                  submitted && !phone ? " onboarding-input-error" : ""
                }`}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {submitted && !phone && (
                <div className="onboarding-error">
                  전화번호를 입력해 주세요.
                </div>
              )}
            </div>
            <div className="signup-field">
              <label className="signup-label" htmlFor="address">
                주소
              </label>
              <input
                id="address"
                className={`signup-input${
                  submitted && !address ? " onboarding-input-error" : ""
                }`}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {submitted && !address && (
                <div className="onboarding-error">주소를 입력해 주세요.</div>
              )}
            </div>
            <button
              type="submit"
              className="signup-button signup-submit-btn"
              disabled={!(gender && phone && address)}
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
