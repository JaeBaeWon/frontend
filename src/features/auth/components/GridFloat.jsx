// GridFloat.jsx
import React from "react";
import { motion } from "framer-motion";
import grapeIcon from "../images/grape_icon.png";
import seatIcon from "../images/seat_icon.png";
import ticketIcon from "../images/ticket_icon.png";

const images = [grapeIcon, seatIcon, ticketIcon];

export default function GridFloat() {
  const rows = 10;
  const cols = 6;
  const spacingX = 320;
  const spacingY = 320;

  const items = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const img = images[(r + c) % images.length];
      const floatDuration = 4 + Math.random() * 2;
      const floatDelay = Math.random() * 2;

      const top = r * spacingY + c * 0; // 대각선 느낌을 위해 X에 따라 Y 보정
      const left = c * spacingX;

      items.push(
        <motion.img
          key={`r${r}c${c}`}
          src={img}
          alt="floating icon"
          style={{ ...(styles.floatImage || {}), top, left }}
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.03, 1],
            rotate: [0, 1.5, 0],
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: floatDelay,
          }}
        />,
      );
    }
  }

  return <div style={styles.floatBackground}>{items}</div>;
}

const styles = {
  floatBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "var(--cardbg)",
    overflow: "hidden",
    zIndex: 0,
  },
  floatImage: {
    position: "absolute",
    width: "300px",
    height: "300px",
    objectFit: "contain",
    pointerEvents: "none",
    opacity: 0.6,
  },
};
