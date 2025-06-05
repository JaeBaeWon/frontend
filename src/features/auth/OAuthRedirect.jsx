import React, { useEffect } from "react";

const OAuthRedirect = () => {
    useEffect(() => {
        const fetchRedirect = async () => {
            try {
                const res = await fetch("https://api.podopicker.store/auth/oauth2/success", {
                    credentials: "include", // 🔥 쿠키 수신을 위한 필수 옵션
                });

                if (!res.ok) {
                    throw new Error("OAuth 리디렉션 실패");
                }

                const data = await res.json();
                window.location.href = data.redirectUrl; // ✅ 백엔드가 알려준 곳으로 이동
            } catch (err) {
                console.error("OAuth 처리 실패:", err);
                window.location.href = "/auth/login?error=true";
            }
        };

        fetchRedirect();
    }, []);

    return <div>로그인 중입니다... 잠시만 기다려 주세요.</div>;
};

export default OAuthRedirect;
