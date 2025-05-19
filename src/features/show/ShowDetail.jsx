import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import "./ShowDetail.css";

function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     axios
  //       .get(`/api/shows/${id}`)
  //       .then((res) => {
  //         setShow(res.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error("공연 정보를 불러오는데 실패했습니다.", err);
  //         setLoading(false);
  //       });
  //   }, [id]);

  // 테스트용 더미 데이터
  useEffect(() => {
    const dummy = {
      id: 1,
      title: "NEO CITY : SEOUL THE LINK",
      imageUrl: "https://via.placeholder.com/400x600?text=공연+포스터",
      location: "서울 코엑스 아티움",
      date: "2025.05.20 - 2025.05.30",
      startDate: "2025-05-20",
      endDate: "2025-05-30",
      ticketOpenDate: "2025-06-30",
      ticketCloseDate: "2025-06-31",
      time: "오후 3시 ~ 오후 7시",
      price: 150000,
      views: 127,
    };

    setShow(dummy);
    setLoading(false);
  }, [id]);

  const navigate = useNavigate();

  const getShowStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return "공연 예정";
    if (now >= start && now <= end) return "공연 진행 중";
    return "공연 종료";
  };

  const isBeforeTicketOpen = (ticketOpenDate) => {
    const now = new Date();
    return now < new Date(ticketOpenDate);
  };

  if (loading) return <div className="showdetail-loading">로딩 중...</div>;
  if (!show)
    return (
      <div className="showdetail-loading">공연 정보를 찾을 수 없습니다.</div>
    );

  const status = getShowStatus(show.startDate, show.endDate);
  const beforeTicketOpen = isBeforeTicketOpen(show.ticketOpenDate);

  return (
    <div className="showdetail-container">
      <Header />
      <main className="showdetail-main">
        <section className="showdetail-section">
          {/* 좌측: 포스터 */}
          <div className="showdetail-poster-wrap">
            <div className="showdetail-poster-inner">
              <img
                src={show.imageUrl}
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
            {status !== "공연 종료" && (
              <button className="showdetail-select-btn">
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
