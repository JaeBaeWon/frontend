import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

function RefundAlertComplete() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Pretendard, sans-serif",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#1c1f26" }}>
          예매 취소 및 환불이 완료되었습니다.
        </h2>
        <p style={{ fontSize: "18px", marginTop: "16px" }}>
          고객님의 예매 취소 및 환불이 정상적으로 처리되었습니다.
          <br />
          환불 내역은 마이페이지에서 확인하실 수 있습니다.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "32px",
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          메인으로 가기
        </button>
      </div>
      <Footer />
    </>
  );
}

export default RefundAlertComplete;
