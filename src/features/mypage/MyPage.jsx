import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFilePerson,
  BsList,
  BsFillGeoAltFill,
  BsDoorClosedFill,
} from "react-icons/bs";
import "./MyPage.css";
import MypageLayout from "./components/MypageLayout";

const menuList = [
  { name: "내 정보", path: "/mypage", icon: () => <BsFilePerson /> },
  { name: "예매 내역", path: "/mypage/reservations", icon: () => <BsList /> },
  {
    name: "배송지 관리",
    path: "/mypage/manageaddress",
    icon: () => <BsFillGeoAltFill />,
  },
  {
    name: "탈퇴하기",
    path: "/mypage/withdraw",
    icon: () => <BsDoorClosedFill />,
  },
];

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyUser = {
      name: "정재현",
      email: "nct127@example.com",
      phone: "010-1997-0214",
      birth: "1997-02-14",
      gender: "남자",
    };
    setUserInfo(dummyUser);
  }, []);

  return (
    <MypageLayout activeMenu="내 정보">
      <h2 className="title">내 정보</h2>
      <div className="infoCard">
        <p className="infoLabel">이름</p>
        <p className="infoValue">{userInfo?.name}</p>
        <p className="infoLabel">이메일</p>
        <p className="infoValue">{userInfo?.email}</p>
        <p className="infoLabel">휴대폰 번호</p>
        <p className="infoValue">{userInfo?.phone}</p>
        <p className="infoLabel">생년월일</p>
        <p className="infoValue">{userInfo?.birth}</p>
        <p className="infoLabel">성별</p>
        <p className="infoValue">{userInfo?.gender}</p>
      </div>
      <button
        className="editProfileBtn"
        style={{
          marginTop: "20px",
          padding: "12px 0",
          width: "100%",
          background: "var(--primary)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/mypage/profiledetails")}
      >
        내 정보 수정하기
      </button>
    </MypageLayout>
  );
}

export default MyPage;
