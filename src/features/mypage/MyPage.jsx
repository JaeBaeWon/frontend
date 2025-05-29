import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFilePerson,
  BsList,
  BsFillGeoAltFill,
  BsDoorClosedFill,
} from "react-icons/bs";
import "./MyPage.css";
import Header from "../../components/layout/Header";
import MypageLayout from "./components/MypageLayout";
import axios from "axios";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ 누락 방지

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchInfo = async () => {
      try {
        // (1) /user/info API 호출: 회원 기본 정보 및 온보딩 완료 여부
        const infoRes = await axios.get("/user/info", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        // (2) /user/profile API 호출: 회원 프로필 상세 정보
        const profileRes = await axios.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        // (3) member + profile 정보를 합쳐서 상태에 저장
        setUserInfo({
          ...infoRes.data.member,
          ...profileRes.data,
        });
        setOnboardingComplete(infoRes.data.onboardingComplete);
      } catch (err) {
        // (4) 인증 오류 시 로그인 페이지로 이동, 기타 오류는 에러 메시지 표시
        console.error("❌ 회원 정보 불러오기 실패", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = "/login";
        } else {
          setError("회원 정보를 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);


  if (loading) return <p style={{ padding: "2rem" }}>로딩 중...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

  return (
    <>
      <MypageLayout activeMenu="내 정보">
        <h2 className="title">내 정보</h2>
        <div className="infoCard">
          {/*           <p className="infoLabel">이메일</p> */}
          {/*           <p className="infoValue">{userInfo?.email || "미입력"}</p> */}

          {onboardingComplete ? (
            <>
              <p className="infoLabel">성별</p>
              <p className="infoValue">{userInfo?.gender || "미입력"}</p>

              <p className="infoLabel">주소</p>
              <p className="infoValue">
                {(userInfo?.streetAdr || "") +
                  " " +
                  (userInfo?.detailAdr || "")}
              </p>

              <p className="infoLabel">전화번호</p>
              <p className="infoValue">{userInfo?.phone || "미입력"}</p>

              <p className="infoLabel">생년월일</p>
              <p className="infoValue">
                {userInfo?.birthDate?.replaceAll("-", "/") || "미입력"}
              </p>
            </>
          ) : (
            <p
              style={{
                fontSize: "1rem",
                color: "#888",
                marginTop: "16px",
              }}
            >
              아직 온보딩 정보가 입력되지 않았습니다. 마이페이지에서 추가 정보를
              입력해주세요.
            </p>
          )}

          <button
            className="editProfileBtn"
            onClick={() => navigate("/mypage/profiledetails")}
          >
            내 정보 수정하기
          </button>
        </div>
      </MypageLayout>
    </>
  );
}

export default MyPage;
