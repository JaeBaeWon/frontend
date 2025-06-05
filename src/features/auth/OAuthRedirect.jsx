import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ onboarding 여부 쿼리 파라미터로 확인
        const params = new URLSearchParams(window.location.search);
        const onboardingComplete = params.get("onboardingComplete") === "true";

        if (onboardingComplete) {
            navigate("/");
        } else {
            navigate("/signup/onboarding");
        }
    }, []);

    return <div>로그인 중입니다... 잠시만 기다려 주세요.</div>;
};

export default OAuthRedirect;
