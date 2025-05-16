import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import "./MyPage.css";
import Sidebar from "../../components/navigation/Sidebar";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const dummyUser = {
      name: "홍길동",
      email: "abc@example.com",
      phone: "010-1234-5678",
      birth: "1995-01-23",
      gender: "남자",
    };
    setUserInfo(dummyUser);
  }, []);

  return (
    <div className="mypageContainer">
      <Header isLoggedIn={true} />
      <div className="mypageContent">
        <Sidebar active="내 정보" />
        <main className="main">
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
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
