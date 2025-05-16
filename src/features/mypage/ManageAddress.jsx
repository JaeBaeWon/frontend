import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/navigation/Sidebar";
import "./ManageAddress.css";

const ManageAddress = () => {
  const [isEdit, setIsEdit] = useState(false);

  // 폼 상태 등은 필요에 따라 추가
  // const [form, setForm] = useState({ ... });

  return (
    <div className="container">
      <Header />
      <div className="inner">
        <Sidebar active="배송지 관리" />
        <main className="main">
          <h2 className="title">배송지 관리</h2>
          {!isEdit ? (
            <section>
              <div className="addressBox">
                <b className="addressBoxName">성명</b>
                <span className="addressBoxTag">기본 배송지</span>
                <div>사랑시 고백구 행복동 소망아파트 101동 101호</div>
              </div>
              <button className="btn btnMain" onClick={() => setIsEdit(true)}>
                배송지 수정
              </button>
            </section>
          ) : (
            <form className="addressForm">
              <div className="formGroup">
                <label className="label">주소</label>
                <input className="input" placeholder="우편번호 찾기" disabled />
                <button type="button" className="btn btnMain">
                  주소
                </button>
              </div>
              <div className="formGroup">
                <label className="label">배송지 명</label>
                <input className="input" placeholder="예시 : 집, 회사" />
              </div>
              <div className="formGroup">
                <label className="label">받는 분</label>
                <input className="input" />
              </div>
              <div className="formGroup">
                <label className="label">휴대폰 번호</label>
                <input
                  className="input"
                  placeholder="휴대폰 번호 (- 없이 입력)"
                />
              </div>
              <div className="formGroup">
                <input type="checkbox" id="default" />
                <label htmlFor="default" style={{ marginLeft: 4 }}>
                  기본 배송지로
                </label>
              </div>
              <div className="formActions">
                <button type="submit" className="btn btnMain">
                  저장하기
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsEdit(false)}
                >
                  취소
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ManageAddress;
