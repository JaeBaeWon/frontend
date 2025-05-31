import React, { useEffect, useState } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import "./Ranking.css";
import ShowCard from "./ShowCard";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/performance/ranking?size=15`,
        );
        const shows = response.data.content.map((item) => ({
          id: item.performId,
          title: item.title,
          genre: item.category,
          thumbnailUrl: item.performImg.startsWith("/")
            ? item.performImg
            : "/" + item.performImg,
          venue: item.location,
          period: `${item.performStartAt} ~ ${item.performEndAt}`,
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
                <div key={show.id} className="rankingCardWrap">
                  <div className="rankBadge">{idx + 1}</div>
                  <ShowCard {...show} />
                </div>
              ))}
            </div>
            {/* 4~15위 리스트 */}
            <ul className="rankingList">
              {ranking.slice(3, 15).map((show, idx) => (
                <li key={show.id} className="rankingListItem">
                  <span className="listRank">{idx + 4}</span>
                  <img
                    src={show.thumbnailUrl}
                    alt={show.title}
                    className="listThumb"
                  />
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
