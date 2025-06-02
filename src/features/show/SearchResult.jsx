import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ShowGrid from "./components/ShowGrid";
import axios from "axios";
import "./ShowList.css";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResult() {
  const query = useQuery();
  const keyword = query.get("keyword")?.trim() || "";
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
      if (!keyword) {
        setResults([]);
        setLoading(false);
        return;
      }

      const fetchSearchResults = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${API_BASE_URL}/performance/search?keyword=${encodeURIComponent(keyword)}&page=0`
          );
          const mapped = res.data.content.map((item) => ({
            performId: item.performId,
            title: item.title,
            venue: item.location,
            period: `${item.performStartAt} ~ ${item.performEndAt}`,
            thumbnailUrl: item.performImg.startsWith("/")
              ? item.performImg
              : "/" + (item.performImg || "default.jpg"),
          }));
          setResults(mapped);
        } catch (error) {
          console.error("검색 결과 가져오기 실패:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }, [keyword]);

  return (
    <div className="showlist-container">
      <Header />
      <main className="showlist-main">
        <section className="showlist-section">
          <h2 className="showlist-title">검색 결과</h2>
          {loading ? (
            <p className="showlist-loading">로딩 중...</p>
          ) : !keyword ? (
            <p className="showlist-empty">검색어를 입력해 주세요.</p>
          ) : results.length === 0 ? (
            <p className="showlist-empty">검색 결과가 없습니다.</p>
          ) : (
            <ShowGrid shows={results} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
