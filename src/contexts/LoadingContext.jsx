import React, {
  createContext,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("로딩 중입니다...");
  const timerRef = useRef(null);

  // 3초 후 로딩 표시
  const startLoading = useCallback(({ message = "로딩 중입니다..." } = {}) => {
    setIsLoading(true);
    setLoadingMessage(message);
    timerRef.current = setTimeout(() => setShowLoader(true), 3000);
  }, []);

  const stopLoading = useCallback(() => {
    setShowLoader(false);
    setIsLoading(false);
    setLoadingMessage("로딩 중입니다...");
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        showLoader,
        loadingMessage,
        startLoading,
        stopLoading,
        setLoadingMessage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function LoadingScreen() {
  const { isLoading, showLoader, loadingMessage } = useContext(LoadingContext);

  return (
    <AnimatePresence>
      {isLoading && showLoader && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="spinner"
            animate={{
              rotate: 360,
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 2px 8px rgba(63,0,191,0.08)",
                "0 4px 16px rgba(63,0,191,0.16)",
                "0 2px 8px rgba(63,0,191,0.08)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
              times: [0, 0.5, 1],
            }}
          />
          <span className="loading-text">
            {loadingMessage}
            <span className="dot-ani" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
