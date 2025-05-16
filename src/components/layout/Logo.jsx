import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  const pathVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 120,
        position: "relative",
        cursor: "pointer",
      }}
    >
      <AnimatePresence mode="wait">
        {!hovered ? (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: "40px",
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
          >
            포도피커
          </motion.div>
        ) : (
          <motion.svg
            key="svg"
            width="60"
            height="28"
            viewBox="0 0 836.000000 368.000000"
            preserveAspectRatio="xMidYMid meet"
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.g
              transform="translate(0.000000,368.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <motion.path
                d="M1539 3633 c-11 -27 -361 -853 -778 -1838 l-758 -1790 1006 -3 c553 -1 1008 1 1012 5 4 5 343 802 754 1773 411 971 760 1795 776 1833 l28 67 -1010 0 -1010 0 -20 -47z"
                fill="#FFFFFF"
                variants={pathVariants}
              />
              <motion.path
                d="M3909 3633 c-11 -27 -361 -853 -778 -1838 l-758 -1790 1005 -3 c553 -1 1009 1 1013 5 4 5 343 802 754 1773 411 971 760 1795 776 1833 l28 67 -1010 0 -1010 0 -20 -47z"
                fill="#FFFFFF"
                variants={pathVariants}
              />
              <motion.path
                d="M6322 3655 c-7 -14 -168 -391 -358 -838 -190 -447 -348 -815 -351 -820 -2 -4 453 -6 1012 -5 l1017 3 350 820 c192 451 354 830 359 843 l9 22 -1014 0 -1013 0 -11 -25z"
                fill="#00BF6F"
                variants={pathVariants}
              />
              <motion.path
                d="M5511 1663 c-7 -16 -168 -392 -358 -838 -190 -445 -347 -813 -350 -818 -2 -4 453 -6 1012 -5 l1016 3 335 785 c183 432 345 811 359 843 l24 57 -1013 0 -1013 0 -12 -27z"
                fill="#FFFFFF"
                variants={pathVariants}
              />
            </motion.g>
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}