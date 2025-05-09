import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

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
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* 로고 */}
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="포도피커 로고" />
        </Link>

        {/* 네비게이션 */}
        <nav className={styles.nav}>
          {genres.map((g) => (
            <Link
              key={g.value}
              to={`/shows?genre=${g.value}`}
              className={`${styles.navLink} ${
                currentGenre === g.value ? styles.activeLink : ""
              }`}
            >
              {g.label}
            </Link>
          ))}
          <Link to="/show/ranking" className={styles.navLink}>
            실시간 랭킹
          </Link>
        </nav>

        {/* 검색 */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="원하는 좌석을 찾아보세요"
            className={styles.searchInput}
          />
        </div>

        {/* 로그인 / 드롭다운 */}
        <div className={styles.accountArea} ref={dropdownRef}>
          {isLoggedIn ? (
            <div
              className={styles.dropdownTrigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              마이페이지 ▾
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to="/mypage" className={styles.dropdownItem}>
                    내 정보
                  </Link>
                  <Link
                    to="/mypage/reservations"
                    className={styles.dropdownItem}
                  >
                    예매 내역
                  </Link>
                  <Link to="/mypage/shipment" className={styles.dropdownItem}>
                    배송지 관리
                  </Link>
                  <div className={styles.dropdownItem} onClick={handleLogout}>
                    로그아웃
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.authBtn}>
                로그인
              </Link>
              <Link to="/signup" className={styles.authBtn}>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
