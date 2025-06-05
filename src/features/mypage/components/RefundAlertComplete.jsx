import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MypageLayout from "./MypageLayout";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

function RefundAlertComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const reservationId = location.state?.reservationId;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);

    // ✅ 이메일 발송 요청
    const sendEmail = async () => {
      try {
        console.log("📧 이메일 발송 요청:", reservationId);

        await axios.post(
          `${API_BASE_URL}/email/send/${reservationId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          },
        );

        console.log("✅ 이메일 전송 성공");
      } catch (err) {
        console.warn("❌ 이메일 전송 실패 (계속 진행):", err);
      }
    };

    sendEmail();
    return () => clearTimeout(timer);
  }, [reservationId]);

  return (
    <MypageLayout activeMenu="예매 내역">
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
    </MypageLayout>
  );
}

export default RefundAlertComplete;
