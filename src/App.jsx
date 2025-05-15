import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findemail" element={<FindEmailPage />} />
        <Route path="/emailfound" element={<FindEmailSuccess />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetcomplete" element={<ResetComplete />} />
        <Route path="/shows" element={<ShowList />} />
        <Route path="/shows/:id" element={<ShowDetail />} />
        <Route path="/reservation" element={<ReservationFlow />} />
        <Route path="/reservation/payinfo" element={<ShowPayInfo />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/manageaddress" element={<ManageAddress />} />
        <Route path="/mypage/reservations" element={<ReservationList />} />
        <Route
          path="/mypage/reservations/details"
          element={<ReservationDetail />}
        />
        <Route
          path="/mypage/refundcomplete"
          element={<RefundAlertComplete />}
        />
        <Route path="/show/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
