import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "./Logo";
import { BsFilePerson } from "react-icons/bs";

function Header({ searchBar }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("accessToken"),
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 검색창 관련 상태 및 로직
  const placeholders = [
    {
      text: "푸릇푸릇 초여름! 설레는 공연 라인업을 만나보세요!💚",
      link: "/shows?genre=upcoming",
    },
    { text: "요즘 대세! 실시간 인기 공연 랭킹 🏆", link: "/show/ranking" },
  ];
  const [placeholderObj, setPlaceholderObj] = useState(placeholders[0]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const idx = Math.floor(Math.random() * placeholders.length);
    setPlaceholderObj(placeholders[idx]);
  }, []);
  const handlePlaceholderClick = () => {
    if (placeholderObj.link) {
      navigate(placeholderObj.link);
    }
  };
  const handleSearch = () => {
    let searchValue = keyword.trim();
    if (!searchValue) {
      if (placeholderObj.link) {
        navigate(placeholderObj.link);
        return;
      }
      searchValue = placeholderObj.text;
    }
    if (!searchValue) {
      alert("검색어를 입력해 주세요");
      return;
    }
    navigate(`/shows/search?keyword=${encodeURIComponent(searchValue)}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const genres = [
    { label: "뮤지컬", value: "musical" },
    { label: "콘서트", value: "concert" },
    { label: "연극", value: "play" },
    { label: "오픈 예정", value: "upcoming" },
  ];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentGenre = searchParams.get("genre") || "musical";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="header notoSansKR">
      <div className="headerInner">
        <div className="leftArea">
          <Link to="/" className="logo">
            <Logo />
          </Link>
          <div className="header-search-bar-wrap">
            <div className="header-search-bar">
              <input
                type="text"
                className="header-search-input"
                placeholder={placeholderObj.text}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="header-search-icon"
                onClick={handleSearch}
                onMouseDown={(e) => e.preventDefault()}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                aria-label="검색"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7"
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                  />
                  <line
                    x1="14.4142"
                    y1="14"
                    x2="18"
                    y2="17.5858"
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="centerArea">
          <nav style={{ display: "flex", gap: 20, marginLeft: 0 }}>
            {genres.map((g) => (
              <Link
                key={g.value}
                to={`/shows?genre=${g.value}`}
                className="navLink"
              >
                {g.label}
              </Link>
            ))}
            <Link to="/show/ranking" className="navLink">
              실시간 랭킹
            </Link>
          </nav>
        </div>
        <div className="rightArea">
          <div className="authAreaBg"></div>
          <div className="authLinks">
            {isLoggedIn ? (
              <>
                <Link to="/mypage" className="authLink">
                  마이페이지
                </Link>
                <button onClick={handleLogout} className="authLink logoutBtn">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="authLink"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <BsFilePerson style={{ color: "white", fontSize: 18 }} />
                  로그인
                </Link>
                <Link to="/signup" className="authLink">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
