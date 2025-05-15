import React, { useState } from "react";
import "./ProfileDetails.css";

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
    <div className="profile-container">
      <div className="profile-left"></div>
      <div className="profile-right">
        <form className="profile-form">
          <h2 className="profile-title">회원 정보 입력</h2>
          {/* 성별 */}
          <div className="profile-field">
            <label className="profile-label">성별</label>
            <div className="profile-gender-group">
              <button
                type="button"
                className={
                  gender === "male"
                    ? "profile-gender-btn active"
                    : "profile-gender-btn"
                }
                onClick={() => setGender("male")}
              >
                남
              </button>
              <button
                type="button"
                className={
                  gender === "female"
                    ? "profile-gender-btn active"
                    : "profile-gender-btn"
                }
                onClick={() => setGender("female")}
              >
                여
              </button>
            </div>
          </div>
          {/* 전화번호 */}
          <div className="profile-field">
            <label className="profile-label">전화번호</label>
            <input
              type="text"
              placeholder="숫자만 입력"
              value={phone}
              onChange={handlePhoneChange}
              className="profile-input"
              maxLength={11}
            />
          </div>
          {/* 주소 */}
          <div className="profile-field">
            <label className="profile-label">주소</label>
            <input
              type="text"
              placeholder="주소를 입력하세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="profile-input"
            />
          </div>
          {/* 생년월일 */}
          <div className="profile-field">
            <label className="profile-label">생년월일</label>
            <input
              type="text"
              placeholder="YYYY/MM/DD"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              className="profile-input"
              maxLength={10}
            />
          </div>
          <button type="submit" className="profile-button">
            저장
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails;
