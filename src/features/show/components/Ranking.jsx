import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import "./Ranking.css";
import ShowCard from "./ShowCard";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/performance/ranking`);
        const shows = response.data.map((item) => ({
          id: item.performanceId,
          title: item.title,
          genre: item.category,
          thumbnailUrl: item.performanceImg?.startsWith("/")
            ? item.performanceImg
            : "/" + item.performanceImg,
          venue: item.location,
          period: `${formatDate(item.performanceStartAt)} ~ ${formatDate(item.performanceEndAt)}`,
        }));
        setRanking(shows.slice(0, 15));
      } catch (error) {
        console.error("랭킹 데이터 가져오기 실패:", error);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="rankingContainer">
      <Header />
      <main className="rankingMain">
        <h2 className="rankingTitle">실시간 랭킹</h2>
        {loading ? (
          <p className="loadingText">로딩 중...</p>
        ) : (
          <section className="genreSection">
            {/* 1~3위 카드 */}
            <div className="rankingGrid">
              {ranking.slice(0, 3).map((show, idx) => (
                <div
                  key={show.id}
                  className="rankingCardWrap"
                  onClick={() => navigate(`/show/${show.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="rankBadge">{idx + 1}</div>
                  <ShowCard {...show} />
                </div>
              ))}
            </div>
            {/* 4~15위 리스트 */}
            <ul className="rankingList">
              {ranking.slice(3).map((show, idx) => (
                <li
                  key={show.id}
                  className="rankingListItem"
                  onClick={() => navigate(`/show/${show.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="listRank">{idx + 4}</span>
                  <img src={show.thumbnailUrl} alt={show.title} className="listThumb" />
                  <div className="listInfo">
                    <div className="listTitle">{show.title}</div>
                    <div className="listVenue">{show.venue}</div>
                    <div className="listPeriod">{show.period}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Ranking;
