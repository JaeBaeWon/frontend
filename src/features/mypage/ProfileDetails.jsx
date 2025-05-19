import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileDetails.css";
import MypageLayout from "./components/MypageLayout";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function ProfileDetails() {
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [birth, setBirth] = useState("");

  useEffect(() => {
    if (!window.daum || !window.daum.Postcode) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePhoneChange = (e) => {
    // 숫자만 입력
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

        alert("사용자 정보가 수정되었습니다.");
        window.location.href = "/mypage";
      } catch (err) {
        console.error("❌ 사용자 정보 수정 실패:", err.response?.data || err.message);
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
            <div className="profile-gender-group">
              <button
                type="button"
                className={`profile-gender-btn ${gender === "male" ? "active" : ""}`}
                onClick={() => setGender("male")}
              >
                남
              </button>
              <button
                type="button"
                className={`profile-gender-btn ${gender === "female" ? "active" : ""}`}
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
            <div className="address-row">
              <input
                type="text"
                className="profile-input"
                placeholder="우편번호"
                value={zipCode}
                readOnly
              />
              <button type="button" className="profile-button" onClick={openDaumPostcode}>
                주소 찾기
              </button>
            </div>
            <input
              type="text"
              className="profile-input"
              placeholder="도로명 주소"
              value={streetAddress}
              readOnly
            />
            <input
              type="text"
              id="detailAddress"
              className="profile-input"
              placeholder="상세 주소"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
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