import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import ReservationFlow from "./features/reservation/ReservationFlow";

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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/reservations" element={<ReservationList />} />
        <Route
          path="/mypage/reservations/details"
          element={<ReservationDetail />}
        />
        <Route
          path="/mypage/reservations/refundalertcomplete"
          element={<RefundAlertComplete />}
        />
        <Route path="/mypage/manageaddress" element={<ManageAddress />} />
        <Route path="/show/ranking" element={<Ranking />} />

        <Route path="/Reservation" element={<ReservationFlow />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
