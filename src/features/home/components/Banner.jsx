"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronCompactRight } from "react-icons/bs";
import "./Banner.css";
import banner01 from "./images/banner_01.png";
import banner02 from "./images/banner_02.png";
import banner03 from "./images/banner_03.png";
import banner04 from "./images/banner_04.png";

const banners = [
  {
    color: "linear-gradient(to right, #041A1C, #1239E0)",
    image: banner01,
  },
  {
    color: "linear-gradient(to right, #1A0C29, #4C0F8B)",
    image: banner02,
  },
  {
    color: "linear-gradient(to right, #0C291A, #0F8B4C)",
    image: banner04,
  },
  {
    color: "linear-gradient(to right, #0C291A, #0F8B4C)",
    image: banner03,
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
        >
          {banners[bannerIndex].image && (
            <img
              src={banners[bannerIndex].image}
              alt={banners[bannerIndex].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            />
          )}
          <div
            className="banner-content"
            style={{ position: "relative", zIndex: 1 }}
          >
            <h2>{banners[bannerIndex].title}</h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
