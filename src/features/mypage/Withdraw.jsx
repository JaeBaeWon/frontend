import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Withdraw.css";
import MypageLayout from "./components/MypageLayout";

function Withdraw() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    try {
      const response = await fetch("/auth/withdraw", {
        method: "DELETE",
        credentials: "include", // 쿠키 (refreshToken 등) 전송
      });

      if (response.ok) {
        // 탈퇴 성공 시 -> 완료 페이지 이동
        navigate("/mypage/withdrawcomplete");
      } else {
        const errorText = await response.text();
        alert("탈퇴 실패: " + errorText);
      }
    } catch (error) {
      console.error("탈퇴 에러:", error);
      alert("예기치 않은 에러가 발생했습니다.");
    }
  };

  return (
    <MypageLayout activeMenu="탈퇴하기">
      <h2 className="withdraw-title">회원 탈퇴</h2>
      <div className="withdraw-box">
        <div className="withdraw-box-title">꼭 확인해 주세요</div>
        <ul className="withdraw-list">
          <li>회원 탈퇴 시 모든 혜택이 소멸되며 복구가 불가능합니다.</li>
          <li>주문기록은 법적 의무에 따라 5년간 보관됩니다.</li>
          <li>탈퇴 후 5년간 동일 아이디 사용이 불가하며 7일간 재가입이 제한됩니다.</li>
        </ul>
      </div>
      <div className="withdraw-check-row">
        <input
          type="checkbox"
          id="withdraw-check"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <label htmlFor="withdraw-check">
          위 내용을 모두 확인했으며, 명시된 사항에 동의합니다.
        </label>
      </div>
      <div className="withdraw-btn-row">
        <button
          className="withdraw-btn"
          disabled={!checked}
          onClick={handleWithdraw}
        >
          탈퇴하기
        </button>
      </div>
    </MypageLayout>
  );
}

export default Withdraw;
