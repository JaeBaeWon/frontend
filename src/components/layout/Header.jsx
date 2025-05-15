import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.css";
import Logo from "./Logo";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    alert("로그아웃 되었습니다.");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    setDropdownOpen(false);
  };

  return (
    <header className={`${styles.header} ${styles.notoSansKR}`}>
      <div className={styles.headerInner}>
        <div className={styles.leftArea}>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
        </div>
        <nav className={styles.centerArea}>
          {genres.map((g) => (
            <Link
              key={g.value}
              to={`/shows?genre=${g.value}`}
              className={styles.navLink}
            >
              {g.label}
            </Link>
          ))}
          <Link to="/show/ranking" className={styles.navLink}>
            실시간 랭킹
          </Link>
        </nav>
        <div className={styles.rightArea}>
          <div className={styles.authAreaBg}></div>
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.authLink}>
              로그인
            </Link>
            <Link to="/signup" className={styles.authLink}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
