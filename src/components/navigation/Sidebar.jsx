import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.css";

const menuList = [
  { label: "내 정보", icon: "👤", link: "/mypage" },
  { label: "예매 내역", icon: "🎫", link: "/mypage/reservations" },
  { label: "배송지 관리", icon: "📦", link: "/mypage/manageaddress" },
];

function Sidebar({ active }) {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.profileImg} />
        <p className={styles.profileName}>재배원 님</p>
      </div>
      <nav>
        <ul className={styles.menu}>
          {menuList.map((item) => (
            <li
              key={item.label}
              className={
                item.label === active
                  ? `${styles.menuItem} ${styles.menuItemActive}`
                  : styles.menuItem
              }
              onClick={() => navigate(item.link)}
              style={{ cursor: "pointer" }}
            >
              <span role="img" aria-label={item.label}>
                {item.icon}
              </span>{" "}
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
