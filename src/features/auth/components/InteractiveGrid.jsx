import { motion } from "framer-motion";
import { useState } from "react";

export default function InteractiveGrid() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div
      style={{
        height: "100%", // ✅ 부모의 100vh를 꽉 채움
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // ✅ 수직 가운데 정렬
        alignItems: "center", // ✅ 수평 가운데 정렬
        padding: "0 24px",
      }}
    >
      {/* 텍스트 */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#3f00bf",
            marginBottom: 8,
          }}
        >
          소중한 포도알
        </h1>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#000000",
            marginBottom: 6,
          }}
        >
          놓치지 않을 거예요
        </h2>
        <p style={{ fontSize: 14, color: "#888" }}>
          로그인 전에 손가락 풀기! 좌석을 마음껏 클릭해보세요
        </p>
      </div>

      {/* 포도알 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: [1, 0.95, 1.05, 0.9, 1],
              transition: {
                duration: 0.4,
                times: [0, 0.2, 0.4, 0.6, 1],
                ease: "easeInOut",
              },
            }}
            animate={{
              backgroundColor: activeIndex === i ? "#00BF6F" : "#3f00bf",
            }}
            onTap={() => setActiveIndex(i)}
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
