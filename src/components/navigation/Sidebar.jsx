import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFilePerson,
  BsList,
  BsFillGeoAltFill,
  BsDoorClosedFill,
} from "react-icons/bs";
import axios from "axios";
import "./Sidebar.css";

const menuList = [
  { name: "내 정보", path: "/mypage", icon: () => <BsFilePerson /> },
  { name: "예매 내역", path: "/mypage/reservations", icon: () => <BsList /> },
  {
    name: "배송지 관리",
    path: "/mypage/manageaddress",
    icon: () => <BsFillGeoAltFill />,
  },
  {
    name: "탈퇴하기",
    path: "/mypage/withdraw",
    icon: () => <BsDoorClosedFill />,
  },
];

function Sidebar({ active }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const name = res.data.member?.userName || "사용자";
        setUserName(name);
        console.log("✅ 유저 정보 응답", res.data);
      })
      .catch((err) => {
        console.error("❌ 사이드바 사용자 이름 로딩 실패", err);
      });
  }, []);

  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="profileImg" />
        <p className="profileName">{userName} 님</p>
      </div>
      <nav>
        <ul className="menu">
          {menuList.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                className={
                  item.name === active ? "menuItem menuItemActive" : "menuItem"
                }
                onClick={() => navigate(item.path)}
              >
                <span
                  role="img"
                  aria-label={item.name}
                  style={{ marginRight: 8 }}
                >
                  {item.icon()}
                </span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
