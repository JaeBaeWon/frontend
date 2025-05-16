import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/navigation/Sidebar";
import styles from "./MyPage.module.css";
import axios from "axios";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/auth/info")
      .then((res) => {
        setUserInfo(res.data.member);
        setOnboardingComplete(res.data.onboardingComplete);
      })
      .catch((err) => {
        console.error("❌ 회원 정보 불러오기 실패", err);
        setError("회원 정보를 불러오지 못했습니다.");
      });
  }, []);

  if (error) {
    return <div className={styles.mypageContainer}>{error}</div>;
  }

  return (
    <div className={styles.mypageContainer}>
      <Header isLoggedIn={true} />
      <div className={styles.mypageContent}>
        <Sidebar active="내 정보" />
        <main className={styles.main}>
          <h2 className={styles.title}>내 정보</h2>
          <div className={styles.infoCard}>
            {userInfo ? (
              <>
                <p className={styles.infoLabel}>이름</p>
                <p className={styles.infoValue}>{userInfo.user_name}</p>

                <p className={styles.infoLabel}>이메일</p>
                <p className={styles.infoValue}>{userInfo.email}</p>

                {onboardingComplete ? (
                  <>
                    <p className={styles.infoLabel}>성별</p>
                    <p className={styles.infoValue}>{userInfo.gender}</p>

                    <p className={styles.infoLabel}>주소</p>
                    <p className={styles.infoValue}>
                      {userInfo.streetAdr} {userInfo.detailAdr}
                    </p>

                    <p className={styles.infoLabel}>전화번호</p>
                    <p className={styles.infoValue}>{userInfo.phone}</p>

                    <p className={styles.infoLabel}>생년월일</p>
                    <p className={styles.infoValue}>{userInfo.birthday}</p>
                  </>
                ) : (
                  <p style={{ fontSize: "1rem", color: "#888", marginTop: "16px" }}>
                    아직 온보딩 정보가 입력되지 않았습니다. 마이페이지에서 추가 정보를 입력해주세요.
                  </p>
                )}
              </>
            ) : (
              <p>불러오는 중...</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
