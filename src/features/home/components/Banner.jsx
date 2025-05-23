"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronCompactRight } from "react-icons/bs";
import "./Banner.css";

const banners = [
  {
    title: "배너 이미지 #1",
    link: "#",
    color: "linear-gradient(to right, #041A1C, #1239E0)",
  },
  {
    title: "배너 이미지 #2",
    link: "#",
    color: "linear-gradient(to right, #1A0C29, #4C0F8B)",
  },
  {
    title: "배너 이미지 #3",
    link: "#",
    color: "linear-gradient(to right, #0C291A, #0F8B4C)",
  },
  {
    title: "배너 이미지 #4",
    link: "#",
    color: "linear-gradient(to right, #0C291A, #0F8B4C)",
  },
];

const variants = {
  enter: (direction = 0) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction = 0) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function Banner() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;
  const bannerIndex =
    ((page % banners.length) + banners.length) % banners.length;

  return (
    <div className="slider-container">
      {/* 왼쪽(이전) 버튼 */}
      <button
        className="carousel-btn left"
        onClick={() => paginate(-1)}
        aria-label="이전 배너"
      >
        <BsChevronCompactRight
          style={{ transform: "rotate(180deg)", fontSize: 32 }}
        />
      </button>
      {/* 오른쪽(다음) 버튼 */}
      <button
        className="carousel-btn right"
        onClick={() => paginate(1)}
        aria-label="다음 배너"
      >
        <BsChevronCompactRight style={{ fontSize: 32 }} />
      </button>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction ?? 0}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
          className="slide-banner"
          style={{ background: banners[bannerIndex].color }}
        >
          <div className="banner-content">
            <h2>{banners[bannerIndex].title}</h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
