import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import "./PerformanceForm.css";

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
        const res = await axios.get(
          `${API_BASE_URL}/performance/manage/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );
        const data = res.data;

        console.log("🎯 공연 상세 데이터:", data);
        console.log("✅ start:", data.performStartAt);
        console.log("✅ end:", data.performEndAt);
        console.log("✅ open:", data.performanceOpenAt);

        setPerformance(data);
      } catch (err) {
        console.error("❌ 공연 상세 조회 실패:", err);
        setErrorMsg("공연 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchPerformance();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/performance/manage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert("공연이 삭제되었습니다.");
      navigate("/manage/myperformances");
    } catch (error) {
      console.error("❌ 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/manage/performance-form?id=${id}`);
  };

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
          <div className="detailCard">
            <h2 className="title">공연 상세 보기</h2>
            <div className="detailTopRow">
              <img
                src={performance.performanceImg}
                alt={`${performance.title} 포스터`}
                className="posterImage"
              />
              <div className="detailTableWrapper">
                <table className="detailTable">
                  <tbody>
                    <tr>
                      <th>공연명</th>
                      <td>{performance.title}</td>
                    </tr>
                    <tr>
                      <th>설명</th>
                      <td>{performance.description}</td>
                    </tr>
                    <tr>
                      <th>카테고리</th>
                      <td>{performance.category}</td>
                    </tr>
                    <tr>
                      <th>장소</th>
                      <td>{performance.location}</td>
                    </tr>
                    <tr>
                      <th>공연 기간</th>
                      <td>
                        {performance.performStartAt} -{" "}
                        {performance.performEndAt}
                      </td>
                    </tr>
                    <tr>
                      <th>예매 오픈</th>
                      <td>{performance.performanceOpenAt}</td>
                    </tr>
                    <tr>
                      <th>좌석 수</th>
                      <td>{performance.totalSeats}</td>
                    </tr>
                    <tr>
                      <th>가격</th>
                      <td>{performance.price}원</td>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>{performance.performanceStatus}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="detailBtnRow">
              <div className="leftBtns">
                <button className="editBtn" onClick={handleEdit}>
                  수정
                </button>
              </div>
              <button className="cancelBtn" onClick={() => navigate(-1)}>
                돌아가기
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyPerformanceDetail;
