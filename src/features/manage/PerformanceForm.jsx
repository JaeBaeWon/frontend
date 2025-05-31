import React, { useState } from "react";
// import { createPerformance, updatePerformance } from "../../api/manageApi";

const PerformanceForm = ({ isEdit, initialData, onSubmitSuccess }) => {
  const [form, setForm] = useState(
    initialData || { title: "", location: "" /*, ... */ },
  );
  // const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (isEdit) {
      //   await updatePerformance(initialData.id, form, token);
      // } else {
      //   await createPerformance(form, token);
      // }
      onSubmitSuccess && onSubmitSuccess();
    } catch (err) {
      console.error("등록/수정 실패", err);
    }
  };

  return (
    <form className="performanceForm" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="공연 제목"
        value={form.title}
        onChange={handleChange}
        className="performanceInput"
        autoComplete="off"
      />
      <input
        name="location"
        placeholder="공연 장소"
        value={form.location}
        onChange={handleChange}
        className="performanceInput"
        autoComplete="off"
      />
      {/* 필요한 추가 필드들 */}
      <button className="performanceSubmitBtn" type="submit">
        {isEdit ? "수정" : "등록"}
      </button>
    </form>
  );
};

export default PerformanceForm;
