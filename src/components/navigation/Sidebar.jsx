import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const menuList = [
  { label: "내 정보", icon: "👤", link: "/mypage" },
  { label: "예매 내역", icon: "🎫", link: "/mypage/reservations" },
  { label: "배송지 관리", icon: "📦", link: "/mypage/manageaddress" },
];

function Sidebar({ active }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="profileImg" />
        <p className="profileName">재배원 님</p>
      </div>
      <nav>
        <ul className="menu">
          {menuList.map((item) => (
            <li
              key={item.label}
              className={
                item.label === active ? "menuItem menuItemActive" : "menuItem"
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
