import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

const placeholders = [
  "봄날의 설렘을 담은 공연을 찾아볼까요?🌸",
  "오늘의 기분을 더 특별하게 만들어줄 공연✨",
  "친구랑 같이 볼 때 더 재미있는 공연 찾기!",
  "지금 가장 핫한 공연이 궁금하다면?",
  "요즘 인기 있는 공연이 궁금해!",
];

export default function SearchBar() {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const idx = Math.floor(Math.random() * placeholders.length);
    setPlaceholder(placeholders[idx]);
  }, []);

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-flat">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input-icon"
        />
        <BsSearch className="search-icon" />
      </div>
    </div>
  );
}
