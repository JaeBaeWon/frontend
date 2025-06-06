import React, { useState, useEffect } from "react";
import "./PerformanceForm.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_TEST_URL;

const generatePerformanceCode = (category) => {
  const prefix = category === "MUSICAL" ? "MU" : category === "PLAY" ? "PL" : "CO";
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomDigits}`;
};

const getPerformanceStatus = (openAt, endAt) => {
  const now = new Date();
  const open = new Date(openAt);
  const end = new Date(endAt);
  if (end < now) return "CLOSED";
  if (open > now) return "UPCOMING";
  return "ONGOING";
};

const formatToLocalDatetime = (datetimeStr) => {
  if (!datetimeStr) return "";
  const date = new Date(datetimeStr);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const initialForm = {
  title: "",
  description: "",
  category: "",
  performanceStartAt: "",
  performanceEndAt: "",
  performanceOpenAt: "",
  location: "",
  performanceImg: "",
  price: "",
  totalSeats: "",
};

const locations = ["국립 포도극장", "포도피커홀", "피커 라이브홀"];
const categories = [
  { value: "PLAY", label: "연극" },
  { value: "MUSICAL", label: "뮤지컬" },
  { value: "CONCERT", label: "콘서트" },
];

const PerformanceForm = () => {
  const [form, setForm] = useState(initialForm);
  const [previewUrl, setPreviewUrl] = useState(""); // 이미지 미리보기
  const [touched, setTouched] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const isFormValid =
    form.title &&
    form.description &&
    form.category &&
    form.performanceStartAt &&
    form.performanceEndAt &&
    form.performanceOpenAt &&
    form.location &&
    form.performanceImg &&
    form.price &&
    form.totalSeats;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, performanceImg: file }));
      setTouched((prev) => ({ ...prev, performanceImg: true }));
      setPreviewUrl(URL.createObjectURL(file)); // 새 이미지 미리보기
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setErrorMsg("모든 항목을 입력해 주세요.");
      setTouched(Object.keys(initialForm).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    const token = localStorage.getItem("accessToken");

    const dto = {
      title: form.title,
      description: form.description,
      category: form.category,
      performanceStartAt: form.performanceStartAt,
      performanceEndAt: form.performanceEndAt,
      performanceOpenAt: form.performanceOpenAt,
      location: form.location,
      price: Number(form.price),
      totalSeats: Number(form.totalSeats),
      performanceStatus: getPerformanceStatus(form.performanceOpenAt, form.performanceEndAt),
      performanceCode:
        id && form.performanceCode?.trim()
          ? form.performanceCode
          : generatePerformanceCode(form.category),
    };

    try {
      if (!(form.performanceImg instanceof File)) {
        setErrorMsg("이미지 파일을 업로드 해주세요.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
      formData.append("image", form.performanceImg);

      if (id) {
        await axios.put(`${API_BASE_URL}/manage/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        alert("공연이 수정되었습니다.");
      } else {
        await axios.post(`${API_BASE_URL}/manage`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        alert("공연이 등록되었습니다.");
      }

      navigate("/manage/myperformances");
    } catch (err) {
      console.error("❌ 공연 등록/수정 실패", err);
      setErrorMsg(err?.response?.data?.message || "요청에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchPerformance = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/manage/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const data = res.data;
        setForm({
          title: data.title,
          description: data.description,
          category: data.category,
          performanceStartAt: formatToLocalDatetime(data.performanceStartAt),
          performanceEndAt: formatToLocalDatetime(data.performanceEndAt),
          performanceOpenAt: formatToLocalDatetime(data.performanceOpenAt),
          location: data.location,
          performanceImg: "", // 수정 시에도 파일로 받게 하기 위해 비움
          price: data.price?.toString(),
          totalSeats: data.totalSeats?.toString(),
          performanceCode: data.performanceCode || "",
        });
        setPreviewUrl(data.performanceImg); // 기존 이미지 미리보기
      } catch (err) {
        console.error("❌ 공연 데이터 불러오기 실패", err);
        alert("공연 정보를 불러오는 데 실패했습니다.");
        navigate("/manage/myperformances");
      }
    };

    fetchPerformance();
  }, [id]);

  const getInputClass = (name) =>
    !form[name] && touched[name] ? "performanceInput error" : "performanceInput";

  return (
    <div className="mypageContainer">
      <Header />
      <div className="mypageContent">
        <main className="main">
          <div className="formCardWrapper">
            <h2 className="title">{id ? "공연 수정" : "공연 등록"}</h2>
            <form className="performanceForm" onSubmit={handleSubmit}>
              {errorMsg && <div className="formErrorMsg">{errorMsg}</div>}

              <div className="formGroup">
                <label>공연명</label>
                <input name="title" value={form.title} onChange={handleChange} className={getInputClass("title")} />
              </div>

              <div className="formGroup">
                <label>공연 설명</label>
                <textarea name="description" value={form.description} onChange={handleChange} className={getInputClass("description")} />
              </div>

              <div className="formGroup">
                <label>카테고리</label>
                <div className="categoryRadioGroup">
                  {categories.map((cat) => (
                    <label key={cat.value} className="categoryRadioLabel">
                      <input type="radio" name="category" value={cat.value} checked={form.category === cat.value} onChange={handleChange} />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="formGroup">
                <label>공연 기간</label>
                <div className="periodRow">
                  <input type="datetime-local" name="performanceStartAt" value={form.performanceStartAt} onChange={handleChange} className={getInputClass("performanceStartAt")} />
                  <span className="periodTilde">~</span>
                  <input type="datetime-local" name="performanceEndAt" value={form.performanceEndAt} onChange={handleChange} className={getInputClass("performanceEndAt")} />
                </div>
              </div>

              <div className="formGroup">
                <label>예매 오픈일시</label>
                <input type="datetime-local" name="performanceOpenAt" value={form.performanceOpenAt} onChange={handleChange} className={getInputClass("performanceOpenAt")} />
              </div>

              <div className="formGroup">
                <label>공연 장소</label>
                <select name="location" value={form.location} onChange={handleChange} className={getInputClass("location")}>
                  <option value="">장소 선택</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label>총 좌석 수</label>
                <input type="number" name="totalSeats" value={form.totalSeats} onChange={handleChange} className={getInputClass("totalSeats")} />
              </div>

              <div className="formGroup">
                <label>포스터 이미지 업로드</label>
                <input type="file" name="performanceImg" accept="image/*" onChange={handleFileChange} className={getInputClass("performanceImg")} />
              </div>

              {previewUrl && (
                <div className="formGroup">
                  <label>미리보기</label>
                  <img src={previewUrl} alt="포스터 미리보기" style={{ width: "200px", borderRadius: "8px", marginTop: "8px" }} />
                </div>
              )}

              <div className="formGroup">
                <label>티켓 가격</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className={getInputClass("price")} />
              </div>

              <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                <button type="button" className="cancelBtn" style={{ flex: 1 }} onClick={() => {
                  if (JSON.stringify(form) !== JSON.stringify(initialForm) && !window.confirm("입력한 내용이 저장되지 않습니다. 정말 나가시겠습니까?")) return;
                  navigate(-1);
                }} disabled={isSubmitting}>
                  취소
                </button>
                <button className="performanceSubmitBtn" type="submit" style={{ flex: 1 }} disabled={!isFormValid || isSubmitting}>
                  {isSubmitting ? "처리중..." : id ? "수정" : "등록"}
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
