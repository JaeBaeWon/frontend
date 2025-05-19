import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "./Logo";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("accessToken"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
        </div>
        <nav className="centerArea">
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
                <Link to="/login" className="authLink">
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