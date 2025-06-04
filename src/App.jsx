import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoadingProvider,
  LoadingScreen,
  LoadingContext,
} from "./contexts/LoadingContext";
import MainPage from "./features/home/Mainpage";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import FindEmailPage from "./features/auth/FindEmail";
import FindEmailSuccess from "./features/auth/FindEmailSuccess";
import ResetPassword from "./features/auth/ResetPassword";
import ResetComplete from "./features/auth/ResetComplete";
import ShowList from "./features/show/ShowList";
import ShowDetail from "./features/show/ShowDetail";
import ReservationFlow from "./features/reservation/ReservationFlow";
import ShowPayInfo from "./features/reservation/ShowPayInfo";
import MyPage from "./features/mypage/MyPage";
import ManageAddress from "./features/mypage/ManageAddress";
import ReservationList from "./features/mypage/components/ReservationList";
import ReservationDetail from "./features/mypage/components/ReservationDetail";
import RefundAlertComplete from "./features/mypage/components/RefundAlertComplete";
import Ranking from "./features/show/components/Ranking";
import Onboarding from "./features/auth/Onboarding";
import Welcome from "./features/auth/components/Welcome";
import OpenAlertComplete from "./features/show/components/OpenAlertComplete";
import Withdraw from "./features/mypage/Withdraw";
import WithdrawComplete from "./features/mypage/components/WithdrawComplete";
import ProfileDetails from "./features/mypage/ProfileDetails";
import SearchResult from "./features/show/SearchResult";
import GridFloat from "./features/auth/components/GridFloat";
import OAuthRedirect from "./features/auth/OAuthRedirect";

import MyPerformanceList from "./features/manage/MyPerformanceList";
import PerformanceForm from "./features/manage/PerformanceForm";
import MyPerformanceDetail from "./features/manage/MyPerformanceDetail";

function AppContent() {
  const { startLoading, stopLoading } = useContext(LoadingContext);

  /* 실제 연동시에는 해당 useEffect() 부분 삭제해 주세요
    실제 데이터 로딩이 필요한 곳(각 페이지, fetch/axios 등)에서
    비동기 작업 시작 시 startLoading()
    작업 완료 시 stopLoading()
    필요하면 setLoadingMessage()로 메시지 변경
  */
  // useEffect(() => {
  //   startLoading({ message: "테스트 로딩 중입니다!" });
  //   const timer = setTimeout(() => {
  //     stopLoading();
  //   }, 6000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Routes>
      {/* 홈 */}
      <Route path="/" element={<MainPage />} />
      {/* 인증 */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/findemail" element={<FindEmailPage />} />
      <Route path="/emailfound" element={<FindEmailSuccess />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/resetcomplete" element={<ResetComplete />} />
      <Route path="/signup/onboarding" element={<Onboarding />} />
      <Route path="/signup/welcome" element={<Welcome />} />
      <Route path="/login/gridfloat" element={<GridFloat />} />
      <Route path="/oauth-redirect" element={<OAuthRedirect />} />
      {/* 공연 */}
      <Route path="/shows" element={<ShowList />} />
      <Route path="/shows/search" element={<SearchResult />} />
      <Route path="/show/:performId" element={<ShowDetail />} />
      <Route path="/show/ranking" element={<Ranking />} />
      <Route path="/show/openalertcomplete" element={<OpenAlertComplete />} />
      {/* 예매 */}
      <Route path="/reservation" element={<ReservationFlow />} />
      <Route path="/reservation/payinfo" element={<ShowPayInfo />} />
      {/* 마이페이지 */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/manageaddress" element={<ManageAddress />} />
      <Route path="/mypage/reservations" element={<ReservationList />} />
      <Route path="/mypage/reservations/:id" element={<ReservationDetail />} />
      <Route path="/mypage/refundcomplete" element={<RefundAlertComplete />} />
      <Route path="/mypage/withdraw" element={<Withdraw />} />
      <Route path="/mypage/withdrawcomplete" element={<WithdrawComplete />} />
      <Route path="/mypage/profiledetails" element={<ProfileDetails />} />
      {/* 관리자페이지 */}
      <Route path="/manage/myperformances" element={<MyPerformanceList />} />
      <Route path="/manage/performance-form" element={<PerformanceForm />} />
      <Route path="/manage/performance-detail/:id" element={<MyPerformanceDetail />} />
    </Routes>
  );
}

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <LoadingScreen />
        <AppContent />
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
