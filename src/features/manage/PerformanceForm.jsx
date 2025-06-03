import React, { useState, useEffect } from "react";
import "./PerformanceForm.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialForm = {
  title: "",
  category: "",
  performanceStartAt: "",
  performanceEndAt: "",
  performanceOpenAt: "",
  location: "",
  performanceImg: null,
  price: "",
};

const locations = ["국립 포도극장", "포도피커홀", "피커 라이브홀"];
const categories = [
  { value: "PLAY", label: "연극" },
  { value: "MUSICAL", label: "뮤지컬" },
  { value: "CONCERT", label: "콘서트" },
];

const PerformanceForm = ({ isEdit, initialData, onSubmitSuccess }) => {
  const [form, setForm] = useState(initialData || initialForm);
  const [touched, setTouched] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? e.target.files[0] : value,
    });
    setTouched({ ...touched, [name]: true });
  };

  const isFormValid =
    form.title &&
    form.category &&
    form.performanceStartAt &&
    form.performanceEndAt &&
    form.performanceOpenAt &&
    form.location &&
    form.performanceImg &&
    form.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrorMsg("모든 항목을 입력해 주세요.");
      setTouched({
        title: true,
        category: true,
        performanceStartAt: true,
        performanceEndAt: true,
        performanceOpenAt: true,
        location: true,
        performanceImg: true,
        price: true,
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("performStartAt", form.performanceStartAt);
      formData.append("performEndAt", form.performanceEndAt);
      formData.append("performOpenAt", form.performanceOpenAt);
      formData.append("location", form.location);
      formData.append("price", form.price);
      formData.append("image", form.performanceImg);

      const response = await axios.post(
        `${import.meta.env.VITE_TEST_URL}/manager/performance`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.status === 201 || response.status === 200) {
        alert("공연이 등록되었습니다.");
        onSubmitSuccess ? onSubmitSuccess() : navigate("/mypage/performances");
      }
    } catch (err) {
      setErrorMsg("공연 등록에 실패했습니다. 다시 시도해 주세요.");
      console.error("❌ 공연 등록 실패", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (name) =>
    !form[name] && touched[name]
      ? "performanceInput error"
      : "performanceInput";

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (JSON.stringify(form) !== JSON.stringify(initialForm)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [form]);

  return (
    <div className="mypageContainer">
      <Header />
      <div className="mypageContent">
        <main className="main">
          <div className="formCardWrapper">
            <h2 className="title">공연 등록</h2>
            <form className="performanceForm" onSubmit={handleSubmit}>
              {errorMsg && <div className="formErrorMsg">{errorMsg}</div>}
              <div className="formGroup">
                <label htmlFor="performanceTitle">공연명</label>
                <input
                  id="performanceTitle"
                  name="title"
                  placeholder="공연명"
                  value={form.title}
                  onChange={handleChange}
                  onBlur={() => setTouched({ ...touched, title: true })}
                  className={getInputClass("title")}
                  autoComplete="off"
                />
              </div>
              <div className="formGroup">
                <label>카테고리</label>
                <div className="categoryRadioGroup">
                  {categories.map((cat) => (
                    <label key={cat.value} className="categoryRadioLabel">
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={form.category === cat.value}
                        onChange={handleChange}
                        onBlur={() =>
                          setTouched({ ...touched, category: true })
                        }
                      />
                      {cat.label}
                    </label>
                  ))}
                </div>
                {!form.category && touched.category && (
                  <div className="fieldError">카테고리를 선택해 주세요.</div>
                )}
              </div>
              <div className="formGroup">
                <label>공연 기간</label>
                <div className="periodRow">
                  <input
                    type="datetime-local"
                    name="performanceStartAt"
                    value={form.performanceStartAt}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched({ ...touched, performanceStartAt: true })
                    }
                    className={getInputClass("performanceStartAt")}
                  />
                  <span className="periodTilde">~</span>
                  <input
                    type="datetime-local"
                    name="performanceEndAt"
                    value={form.performanceEndAt}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched({ ...touched, performanceEndAt: true })
                    }
                    className={getInputClass("performanceEndAt")}
                  />
                </div>
                {(!form.performanceStartAt || !form.performanceEndAt) &&
                  (touched.performanceStartAt || touched.performanceEndAt) && (
                    <div className="fieldError">공연 기간을 입력해 주세요.</div>
                  )}
              </div>
              <div className="formGroup">
                <label>예매 오픈일시</label>
                <input
                  type="datetime-local"
                  name="performanceOpenAt"
                  value={form.performanceOpenAt}
                  onChange={handleChange}
                  onBlur={() =>
                    setTouched({ ...touched, performanceOpenAt: true })
                  }
                  className={getInputClass("performanceOpenAt")}
                />
                {!form.performanceOpenAt && touched.performanceOpenAt && (
                  <div className="fieldError">
                    예매 오픈일시를 입력해 주세요.
                  </div>
                )}
              </div>
              <div className="formGroup">
                <label>공연 장소</label>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  onBlur={() => setTouched({ ...touched, location: true })}
                  className={getInputClass("location")}
                >
                  <option value="">장소 선택</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {!form.location && touched.location && (
                  <div className="fieldError">공연 장소를 선택해 주세요.</div>
                )}
              </div>
              <div className="formGroup">
                <label>포스터 이미지</label>
                <input
                  type="file"
                  name="performanceImg"
                  onChange={handleChange}
                  onBlur={() =>
                    setTouched({ ...touched, performanceImg: true })
                  }
                  className={getInputClass("performanceImg")}
                />
                {!form.performanceImg && touched.performanceImg && (
                  <div className="fieldError">이미지를 첨부해 주세요.</div>
                )}
              </div>
              <div className="formGroup">
                <label htmlFor="performancePrice">티켓 가격</label>
                <input
                  id="performancePrice"
                  name="price"
                  type="number"
                  placeholder="티켓 가격"
                  value={form.price}
                  onChange={handleChange}
                  onBlur={() => setTouched({ ...touched, price: true })}
                  className={getInputClass("price")}
                  autoComplete="off"
                />
              </div>
              <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                <button
                  type="button"
                  className="cancelBtn"
                  style={{ flex: 1 }}
                  onClick={() => {
                    if (
                      JSON.stringify(form) !== JSON.stringify(initialForm) &&
                      !window.confirm(
                        "입력한 내용이 저장되지 않습니다. 정말 나가시겠습니까?",
                      )
                    ) {
                      return;
                    }
                    navigate(-1);
                  }}
                  disabled={isSubmitting}
                >
                  취소
                </button>
                <button
                  className="performanceSubmitBtn"
                  type="submit"
                  style={{ flex: 1 }}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? "처리중..." : isEdit ? "수정" : "등록"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PerformanceForm;
