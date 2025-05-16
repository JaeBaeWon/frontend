import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 페이지 컴포넌트 import
import Mainpage from "./features/home/Mainpage";
import Signup from "./features/auth/Signup";
import ProfileDetails from "./features/mypage/ProfileDetails";
import Login from "./features/auth/Login";
import FindEmail from "./features/auth/FindEmail";
import FindEmailSuccess from "./features/auth/FindEmailSuccess";
import ResetPassword from "./features/auth/ResetPassword";
import ResetComplete from "./features/auth/ResetComplete";
import ShowList from "./features/show/ShowList";
import ShowDetail from "./features/show/ShowDetail";
import OpenAlertComplete from "./features/show/OpenAlertComplete";
import MyPage from "./features/mypage/MyPage";
import ReservationList from "./features/mypage/ReservationList";
import ReservationDetail from "./features/mypage/ReservationDetail";
import RefundAlertComplete from "./features/mypage/RefundAlertComplete";
import ManageAddress from "./features/mypage/ManageAddress";
import Ranking from "./features/show/Ranking";

// 🔐 보호 라우터 (함께 정의)
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

// 🔁 axios 인터셉터 등록 (토큰 자동 주입 + 401 → refresh)
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post("/auth/refresh", {}, { withCredentials: true });
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (e) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

// 🔸 App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profiledetails" element={<ProfileDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findemail" element={<FindEmail />} />
        <Route path="/findemail/success" element={<FindEmailSuccess />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetcomplete" element={<ResetComplete />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/openalertcomplete" element={<OpenAlertComplete />} />
        <Route path="/show/ranking" element={<Ranking />} />

        {/* ✅ 보호된 마이페이지 라우트들 */}
        <Route path="/mypage" element={<RequireAuth><MyPage /></RequireAuth>} />
        <Route path="/mypage/reservations" element={<RequireAuth><ReservationList /></RequireAuth>} />
        <Route path="/mypage/reservations/details" element={<RequireAuth><ReservationDetail /></RequireAuth>} />
        <Route path="/mypage/reservations/refundalertcomplete" element={<RequireAuth><RefundAlertComplete /></RequireAuth>} />
        <Route path="/mypage/manageaddress" element={<RequireAuth><ManageAddress /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
