import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function GrapeCursorScene() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 20 });

  const background = useTransform([smoothX, smoothY], ([x, y]) => {
    return `radial-gradient(
      circle at ${x}px ${y}px,
      #a288ff 0%,
      #6633ff 40%,
      #3f00bf 100%
    )`;
  });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        background,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <motion.div
        style={{
          position: "fixed",
          x: smoothX,
          y: smoothY,
          fontSize: 100,
          pointerEvents: "none",
        }}
      >
        🍇
      </motion.div>
    </motion.div>
  );
}
