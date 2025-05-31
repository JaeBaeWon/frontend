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

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchInfo = async () => {
      try {
        const infoRes = await axios.get(`${API_BASE_URL}/user/info`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const profileRes = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUserInfo({
          ...infoRes.data.member,
          ...profileRes.data,
        });
      } catch (err) {
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
    <MypageLayout activeMenu="내 정보">
      <h2 className="title">내 정보</h2>
      <div className="infoCard">
        <p className="infoLabel">성별</p>
        <p className="infoValue">{userInfo?.gender || "미입력"}</p>

        <p className="infoLabel">주소</p>
        <p className="infoValue">
          {(userInfo?.streetAdr || "미입력") +
            " " +
            (userInfo?.detailAdr || "") +
            (userInfo?.zipCode ? ` (${userInfo.zipCode})` : "")}
        </p>

        <p className="infoLabel">전화번호</p>
        <p className="infoValue">{userInfo?.phone || "미입력"}</p>

        <p className="infoLabel">생년월일</p>
        <p className="infoValue">
          {userInfo?.birthDate
            ? userInfo.birthDate.replaceAll("-", "/")
            : "미입력"}
        </p>

        <button
          className="editProfileBtn"
          onClick={() => navigate("/mypage/profiledetails")}
        >
          내 정보 수정하기
        </button>
      </div>
    </MypageLayout>
  );
}

export default MyPage;
