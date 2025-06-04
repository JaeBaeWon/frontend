import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import "./PerformanceForm.css"; // 기존 스타일 재사용

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const MyPerformanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/performance/manage/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPerformance(res.data);
      } catch (err) {
        console.error("❌ 공연 상세 조회 실패:", err);
        setErrorMsg("공연 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchPerformance();
  }, [id]);

  if (errorMsg) {
    return (
      <div className="mypageContainer">
        <Header />
        <main className="main">
          <p>{errorMsg}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!performance) {
    return (
      <div className="mypageContainer">
        <Header />
        <main className="main">
          <p>공연 정보를 불러오는 중입니다...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mypageContainer">
      <Header />
      <div className="mypageContent">
        <main className="main">
          <div className="formCardWrapper">
            <h2 className="title">공연 상세 보기</h2>
            <div className="performanceDetail">
              <img
                src={performance.performanceImg}
                alt={`${performance.title} 포스터`}
                className="performancePoster"
              />
              <p><strong>공연명:</strong> {performance.title}</p>
              <p><strong>설명:</strong> {performance.description}</p>
              <p><strong>카테고리:</strong> {performance.category}</p>
              <p><strong>장소:</strong> {performance.location}</p>
              <p><strong>공연 기간:</strong> {performance.performanceStartAt} ~ {performance.performanceEndAt}</p>
              <p><strong>예매 오픈:</strong> {performance.performanceOpenAt}</p>
              <p><strong>좌석 수:</strong> {performance.totalSeats}</p>
              <p><strong>가격:</strong> {performance.price}원</p>
              <p><strong>상태:</strong> {performance.performanceStatus}</p>
            </div>
            <button
              className="cancelBtn"
              style={{ marginTop: "20px" }}
              onClick={() => navigate(-1)}
            >
              돌아가기
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyPerformanceDetail;
