import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const OAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ accessToken 요청
        axios
            .post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
            .then((res) => {
                const { accessToken } = res.data;
                localStorage.setItem("accessToken", accessToken);

                // 🔍 쿼리스트링으로 온보딩 여부 확인
                const params = new URLSearchParams(window.location.search);
                const onboardingComplete = params.get("onboarding") === "true";

                if (onboardingComplete) {
                    navigate("/");
                } else {
                    navigate("/signup/onboarding");
                }
            })
            .catch((err) => {
                console.error("❌ accessToken 재발급 실패", err);
                navigate("/login");
            });
    }, []);

    return <div>로그인 중입니다... 잠시만 기다려 주세요.</div>;
};

export default OAuthRedirect;
