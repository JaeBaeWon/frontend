import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Sidebar from "../../../components/navigation/Sidebar";
import "./MypageLayout.css";

export default function MypageLayout({ children, activeMenu }) {
  return (
    <div className="mypage-layout-container">
      <Header isLoggedIn={true} />
      <div className="mypage-layout-content">
        <Sidebar active={activeMenu} />
        <main className="mypage-layout-main">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
