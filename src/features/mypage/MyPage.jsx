import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import styles from "./MyPage.module.css";
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
    <div className={styles.mypageContainer}>
      <Header isLoggedIn={true} />
      <div className={styles.mypageContent}>
        <Sidebar active="내 정보" />
        <main className={styles.main}>
          <h2 className={styles.title}>내 정보</h2>
          <div className={styles.infoCard}>
            <p className={styles.infoLabel}>이름</p>
            <p className={styles.infoValue}>{userInfo?.name}</p>
            <p className={styles.infoLabel}>이메일</p>
            <p className={styles.infoValue}>{userInfo?.email}</p>
            <p className={styles.infoLabel}>휴대폰 번호</p>
            <p className={styles.infoValue}>{userInfo?.phone}</p>
            <p className={styles.infoLabel}>생년월일</p>
            <p className={styles.infoValue}>{userInfo?.birth}</p>
            <p className={styles.infoLabel}>성별</p>
            <p className={styles.infoValue}>{userInfo?.gender}</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
