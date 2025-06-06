import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import "./ShowDetail.css";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;
const GATEWAY_URL = import.meta.env.VITE_API_URL;
const WEBSOCKET_URL = import.meta.env.VITE_SOCKET_URL;

function ShowDetail() {
  const { performId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReservationUI, setShowReservationUI] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [queueModalVisible, setQueueModalVisible] = useState(false);
  const [queuePosition, setQueuePosition] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/performance/${performId}`)
      .then((res) => {
        setShow(res.data);
        const parsedStart = parseISO(res.data.performStartAt);
        setSelectedDate(parsedStart);
        setLoading(false);
      })
      .catch((err) => {
        console.error("공연 정보를 불러오는데 실패했습니다.", err);
        setLoading(false);
      });
  }, [performId]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get(`${API_BASE_URL}/user/info`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data.member);
        console.log("✅ 사용자 정보 로드됨:", res.data.member);
      })
      .catch((err) => {
        console.error("❌ 사용자 정보 로드 실패:", err);
      });
  }, []);

  // 티켓 오픈 알림 예약 연동
  const handleOpenAlert = async () => {
    console.log("🚀 handleOpenAlert 함수 시작됨");
    if (!userData || !performId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/notification/subscribe`,
        {
          userId: userData.id,
          performanceId: performId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        },
      );

      // 실제 전송된 값 및 응답 출력
      console.log("📦 전송된 userId:", userData.id);
      console.log("📦 전송된 performanceId:", performId);
      console.log("✅ 알림 등록 성공:", response.data);
      navigate("/show/openalertcomplete");
      console.log("➡️ /show/openalertcomplete로 이동");
    } catch (error) {
      console.error("⛔ 오픈 알림 등록 중 오류:", error);
    }
  };

  const startDate = show ? parseISO(show.performStartAt) : null;
  const endDate = show ? parseISO(show.performEndAt) : null;

  if (loading) return <div className="showdetail-loading">로딩 중...</div>;
  if (!show)
    return (
      <div className="showdetail-loading">공연 정보를 찾을 수 없습니다.</div>
    );

  const statusTextMap = {
    UPCOMING: "오픈 예정",
    ONGOING: "진행 중",
    CLOSED: "공연 종료",
  };

  const status = statusTextMap[show.performanceStatus] || "상태 알 수 없음";
  const isClosed = show.performanceStatus === "CLOSED";
  const beforeTicketOpen = show.performanceStatus === "UPCOMING";

  return (
    <div className="showdetail-container">
      <Header />
      <main className="showdetail-main">
        <section className="showdetail-section">
          {/* 좌측: 포스터 */}
          <div className="showdetail-poster-wrap">
            <div className="showdetail-poster-inner">
              <img
                src={
                  show.performImg.startsWith("/")
                    ? show.performImg
                    : "/" + show.performImg
                }
                alt={`${show.title} 포스터`}
                className="showdetail-poster-img"
              />
              {beforeTicketOpen && (
                <button
                  className="showdetail-alert-btn"
                  onClick={() => {
                    console.log("✅ 버튼 클릭됨");
                    handleOpenAlert();
                  }}
                >
                  티켓 오픈 알림 받기
                </button>
              )}
            </div>
          </div>

          {/* 우측: 공연 정보 */}
          <div className="showdetail-info-wrap">
            <div className={`showdetail-status showdetail-status-${status}`}>
              {status}
            </div>
            <div className="showdetail-views">조회수 {show.views}</div>
            <h1 className="showdetail-title">{show.title}</h1>
            <div className="showdetail-price">
              가격 {show.price.toLocaleString()}원
            </div>

            <hr className="showdetail-hr" />
            <div className="showdetail-location">{show.location}</div>
            <div className="showdetail-date">{show.date}</div>
            <div className="showdetail-time">{show.time}</div>

            {/* 잔여석 표시 */}
            <div className="showdetail-remaining-seats">
              잔여석: {show.remainSeats}석 / {show.totalSeats}석
            </div>

            {!isClosed && (
              <>
                <button
                  className="custom-button"
                  onClick={() => setIsDatePickerOpen((prev) => !prev)}
                >
                  날짜 선택
                </button>

                {isDatePickerOpen && (
                  <div className="custom-datepicker-wrapper">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={startDate > new Date() ? startDate : new Date()}
                      maxDate={endDate}
                      dateFormat="yyyy.MM.dd"
                      inline
                    />
                    <button
                      type="button"
                      className="custom-button"
                      onClick={async () => {
                        console.log("🖱️ 예매 버튼 클릭됨");

                        if (!GATEWAY_URL) {
                          console.error(
                            "⛔ API Gateway URL이 설정되지 않았습니다.",
                          );
                          return;
                        }

                        console.log("✅ API Gateway URL 확인됨:", GATEWAY_URL);
                        console.log("🎯 요청에 사용될 performId:", performId);
                        try {
                          const response = await fetch(
                            `${GATEWAY_URL}/ticket/enter`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ performId }),
                            },
                          );

                          const text = await response.text();
                          console.log("✅ 받은 응답:", text);

                          let data = null;
                          try {
                            data = JSON.parse(text);
                          } catch (err) {
                            navigate("/reservation", { state: { performId } });
                            return;
                          }

                          const userId = data.userId;
                          localStorage.setItem("userId", userId);

                          if (data.action === "redirect") {
                            navigate("/reservation", { state: { performId } });
                          } else if (data.action === "wait") {
                            console.log("⏳ 대기열 진입됨");
                            console.log("📍 대기 순번:", data.position);
                            console.log(
                              "🕒 예상 대기 시간:",
                              data.estimatedTime,
                            );

                            const wsUrl = `${WEBSOCKET_URL}?userId=${userId}`;
                            console.log("🔌 WebSocket 연결 시도:", wsUrl);

                            const ws = new WebSocket(wsUrl);

                            ws.onmessage = (event) => {
                              const msg = JSON.parse(event.data);
                              console.log("📨 WebSocket 메시지 수신:", msg);

                              if (msg.action === "enter") {
                                console.log("🎉 입장 가능!");
                                navigate("/reservation", {
                                  state: { performId },
                                });
                              } else if (msg.action === "rank") {
                                setQueueModalVisible(true); // ✅ 모달 띄우기
                                setQueuePosition(msg.rank); // ✅ 모달에 순번 전달
                                setEstimatedTime(msg.estimatedTime); // ✅ 모달에 시간 전달
                              }
                            };

                            ws.onerror = (error) => {
                              console.error("❌ WebSocket 에러:", error);
                              document.getElementById("status").innerText =
                                "⚠️ 연결 오류가 발생했습니다.";
                            };

                            ws.onclose = () => {
                              console.log("🔌 WebSocket 연결 종료");
                            };
                          } else {
                            throw new Error("알 수 없는 action 값");
                          }
                        } catch (error) {
                          console.error("⛔ 예매 요청 실패:", error);
                        }
                      }}
                    >
                      예매하기
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ShowDetail;
