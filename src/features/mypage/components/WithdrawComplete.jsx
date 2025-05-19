import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
// import MypageLayout from "./MypageLayout";

function WithdrawComplete() {
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
          회원 탈퇴가 완료되었습니다.
        </h2>
        <p style={{ fontSize: "18px", marginTop: "16px" }}>
          그동안 포도피커를 이용해주셔서 감사합니다.
          <br />더 나은 서비스로 다시 만날 수 있길 바랍니다.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "32px",
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "var(--primary)",
            color: "#fff",
            border: "2px solid var(--primary)",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: visible
              ? "0px 4px 16px 2px rgba(80, 0, 120, 0.15)"
              : "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition:
              "box-shadow 0.3s, background 0.3s, border 0.3s, opacity 0.8s, transform 0.8s",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--secondary)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow =
              "0px 8px 32px 4px rgba(80, 0, 120, 0.25)";
            e.currentTarget.style.border = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow =
              "0px 4px 16px 2px rgba(80, 0, 120, 0.15)";
            e.currentTarget.style.border = "2px solid var(--primary)";
          }}
        >
          메인으로 가기
        </button>
      </div>
      <Footer />
    </>
  );
}

export default WithdrawComplete;
