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


function ShowDetail() {
  const { performId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReservationUI, setShowReservationUI] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);0


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

  const startDate = show ? parseISO(show.performStartAt) : null;
  const endDate = show ? parseISO(show.performEndAt) : null;

  if (loading) return <div className="showdetail-loading">로딩 중...</div>;
    if (!show)
      return (
        <div className="showdetail-loading">공연 정보를 찾을 수 없습니다.</div>
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
    <div className="showdetail-container">
      <Header />
      <main className="showdetail-main">
        <section className="showdetail-section">
          {/* 좌측: 포스터 */}
          <div className="showdetail-poster-wrap">
            <div className="showdetail-poster-inner">
                <img
                  src={show.performImg.startsWith('/') ? show.performImg : '/' + show.performImg}
                  alt={`${show.title} 포스터`}
                className="showdetail-poster-img"
                />
                {beforeTicketOpen && (
                  <button
                    className="showdetail-alert-btn"
                    onClick={() => navigate("/show/openalertcomplete")}
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
                    className="showdetail-select-btn"
                    onClick={() => setShowReservationUI(true)}
                  >
                    날짜 선택
                  </button>

                  {showReservationUI && (
                    <div className="custom-datepicker-wrapper">
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginBottom: "12px",
                          marginTop: "24px",
                        }}
                      >
                        날짜를 선택하세요
                      </h3>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={startDate > new Date() ? startDate : new Date()}
                        maxDate={endDate}
                        dateFormat="yyyy.MM.dd"
                        inline
                      />
                      <button
                        className="custom-button"
                        onClick={() => {
                          alert(`예매할 날짜: ${selectedDate.toLocaleDateString()}`);
                          navigate('/reservation', { state: { performId } });
                        }}
                      >
                        이 날짜로 예매하기
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