import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import axios from "axios";

function ShowDetail() {
  const { performId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/performance/${performId}`)
      .then((res) => {
        setShow(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("공연 정보를 불러오는데 실패했습니다.", err);
        setLoading(false);
      });
  }, [performId]);

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          fontFamily: "Pretendard, sans-serif",
          background: "#faf9fb",
          minHeight: "100vh",
        }}
      >
        로딩 중...
      </div>
    );
  if (!show)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          fontFamily: "Pretendard, sans-serif",
          background: "#faf9fb",
          minHeight: "100vh",
        }}
      >
        공연 정보를 찾을 수 없습니다.
      </div>
    );

  const statusTextMap = {
    UPCOMING: "공연 예정",
    ONGOING: "공연 진행 중",
    CLOSED: "공연 종료",
  };

  const status = statusTextMap[show.performanceStatus] || "상태 알 수 없음";
  const isClosed = show.performanceStatus === "CLOSED";
  const beforeTicketOpen = show.performanceStatus === "UPCOMING";


  return (
      <div
        style={{
          minHeight: "100vh",
          background: "#faf9fb",
          fontFamily: "Pretendard, sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "48px",
              padding: "60px 40px 0 40px",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {/* 좌측: 포스터 */}
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "0",
              }}
            >
              <div style={{ textAlign: "center", width: "100%" }}>
                <img
                  src={process.env.PUBLIC_URL + show.performImg}
                  alt={`${show.title} 포스터`}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    background: "#fff",
                  }}
                />
                {beforeTicketOpen && (
                  <button
                    onClick={() => navigate("/openalertcomplete")}
                    style={{
                      marginTop: "24px",
                      padding: "10px 24px",
                      border: "1px solid var(--primary)",
                      borderRadius: "999px",
                      background: "#fff",
                      color: "var(--primary)",
                      fontWeight: 600,
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    티켓 오픈 알림 받기
                  </button>
                )}
              </div>
            </div>

            {/* 우측: 공연 정보 */}
            <div
              style={{
                width: "50%",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                padding: "40px 32px",
              }}
            >
              <div
                style={{
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color:
                    show.performanceStatus === "UPCOMING"
                      ? "#f97316"
                      : show.performanceStatus === "CLOSED"
                      ? "#888"
                      : "#16a34a",
                }}
              >
                {status}
              </div>
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}
              >
                조회수 {show.views}
              </div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#222",
                }}
              >
                {show.title}
              </h1>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginBottom: "24px",
                  color: "var(--primary)",
                }}
              >
                가격 {show.price.toLocaleString()}원
              </div>
              <hr
                style={{
                  margin: "24px 0",
                  border: "none",
                  borderTop: "1px solid #eee",
                }}
              />
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#333",
                }}
              >
                {show.location}
              </div>
              <div
                style={{ fontSize: "16px", color: "#555", marginBottom: "4px" }}
              >
                {show.date}
              </div>
              <div
                style={{ fontSize: "16px", color: "#555", marginBottom: "24px" }}
              >
                {show.time}
              </div>

              {!isClosed && (
                <button
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                    padding: "12px 32px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    marginTop: "12px",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  날짜 및 회차 선택
                </button>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  export default ShowDetail;