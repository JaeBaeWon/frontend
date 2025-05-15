import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

function OpenAlertComplete() {
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
          오픈 예정 알림 신청이 완료되었습니다.
        </h2>
        <p style={{ fontSize: "18px", marginTop: "16px" }}>
          고객님께 오픈 예정 알림 신청 확인 메일이 발송되었습니다.
          <br />
          메일 내용을 확인해 주시기 바랍니다.
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

export default OpenAlertComplete;
