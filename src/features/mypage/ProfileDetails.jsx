import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileDetails.css";
import MypageLayout from "./components/MypageLayout";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function ProfileDetails() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  const handlePhoneChange = (e) => {
    // 숫자만 입력
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    // 🔐 성별 체크
    if (!gender) {
      alert("성별을 선택해주세요.");
      return;
    }

    // 🎂 생일 체크
    const formattedBirth = birth.replaceAll("/", "-").trim();
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(formattedBirth);
    if (!isValidDate) {
      alert("생년월일을 YYYY/MM/DD 또는 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }

    const payload = {
      gender: gender === "male" ? "MALE" : "FEMALE",
      phone,
      birthDate: formattedBirth,
    };

    try {
      await axios.post(`${API_BASE_URL}/auth/onboarding`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      alert("사용자 정보가 수정되었습니다.");
      window.location.href = "/mypage";
    } catch (err) {
      console.error(
        "❌ 사용자 정보 수정 실패:",
        err.response?.data || err.message,
      );
      alert("수정에 실패했습니다. 정보를 다시 확인해주세요.");
    }
  };

  return (
    <MypageLayout activeMenu="내 정보">
      <h2 className="title">회원 정보 수정</h2>
      <div className="infoCard">
        <form className="profile-form" onSubmit={handleSubmit}>
          {/* 성별 */}
          <div className="profile-field">
            <label className="profile-label">성별</label>
            <div className="profile-gender-group" style={{ gap: "24px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 500,
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="profile-radio"
                />
                남
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 500,
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="profile-radio"
                />
                여
              </label>
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
    </MypageLayout>
  );
}

export default ProfileDetails;
