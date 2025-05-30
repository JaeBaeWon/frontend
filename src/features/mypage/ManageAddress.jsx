import React, { useEffect, useState } from "react";
import axios from "axios";
import MypageLayout from "./components/MypageLayout";
import "./ManageAddress.css";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const ManageAddress = () => {
  const [zipCode, setZipCode] = useState("");
  const [streetAdr, setStreetAdr] = useState("");
  const [detailAdr, setDetailAdr] = useState("");
  const [phone, setPhone] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const data = res.data;

        setZipCode(data.zipCode || "");
        setStreetAdr(data.streetAdr || "");
        setDetailAdr(data.detailAdr || "");
        setPhone(data.phone || "");
      } catch (err) {
        console.error("❌ 프로필 조회 실패:", err.response?.data || err.message);
        alert("사용자 정보를 불러오지 못했습니다.");
      }
    };

    fetchProfile();

    if (!window.daum?.Postcode) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openDaumPostcode = () => {
    if (!window.daum?.Postcode) {
      alert("카카오 주소 검색 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        const addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        setZipCode(data.zonecode);
        setStreetAdr(addr);
        document.getElementById("detailAdr")?.focus();
      },
    }).open();
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !zipCode || !streetAdr || !detailAdr) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const payload = {
      zipCode,
      streetAdr,
      detailAdr,
      phone,
    };

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`${API_BASE_URL}/user/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      alert("회원 정보가 수정되었습니다.");
      setIsEdit(false);
    } catch (error) {
      console.error("❌ 프로필 수정 실패:", error.response?.data || error.message);
      alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <MypageLayout activeMenu="배송지 관리">
      <h2 className="title">배송지 정보</h2>
      {!isEdit ? (
        <section>
          <div className="addressBox">
            <div>
              <b>우편번호</b>: {zipCode}
            </div>
            <div>{streetAdr} {detailAdr}</div>
            <div>{phone}</div>
          </div>
          <button className="btn btnMain" onClick={() => setIsEdit(true)}>
            정보 수정
          </button>
        </section>
      ) : (
        <form className="addressForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label">주소</label>
            <div className="address-row">
              <input className="input" placeholder="우편번호" value={zipCode} readOnly />
              <button type="button" className="btn btnMain" onClick={openDaumPostcode}>
                주소 찾기
              </button>
            </div>
            <input className="input" placeholder="도로명 주소" value={streetAdr} readOnly />
            <input
              id="detailAdr"
              className="input"
              placeholder="상세 주소"
              value={detailAdr}
              onChange={(e) => setDetailAdr(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label className="label">휴대폰 번호</label>
            <input
              className="input"
              placeholder="휴대폰 번호 (- 없이 입력)"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={11}
            />
          </div>

          <div className="formActions">
            <button type="submit" className="btn btnMain">저장하기</button>
            <button type="button" className="btn" onClick={() => setIsEdit(false)}>취소</button>
          </div>
        </form>
      )}
    </MypageLayout>
  );
};

export default ManageAddress;
