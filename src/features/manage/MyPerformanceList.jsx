import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPerformanceList.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const locations = ["서울", "부산", "대구", "인천", "대전", "광주", "울산"];
const dummyPerformances = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `테스트 공연 ${i + 1}`,
  location: locations[i % locations.length],
}));

const ITEMS_PER_PAGE = 10;

const noticeSummary =
  "파트너사 여러분을 환영합니다! 시스템 및 정책 안내를 꼭 확인해 주세요.";
const noticeDetail = `🎉 파트너사 여러분을 환영합니다!
포도피커와 함께 새로운 시작을 해주신 모든 공연 대행사 파트너사 여러분께 진심으로 감사드립니다. 여러분의 소중한 공연들이 더 많은 관객들과 만날 수 있도록 최선을 다하겠습니다.

📢 시스템 공지사항
최근 업데이트: 2025년 5월 31일 - 공연 등록 시스템 최적화 완료
예정된 점검: 매주 일요일 새벽 2:00-4:00 (정기 점검)

💡 시스템 관련 문의사항이 있으시면 언제든 고객지원팀(1588-0000)으로 연락주세요.


⏰ 공연 등록 마감일 및 검토 소요시간
공연일 기준 최소 2주 전까지 등록 완료
대형 공연 (1,000석 이상): 8주 전까지 권장

검토 소요시간
일반 공연: 영업일 기준 2-3일
대형 공연: 영업일 기준 5-7일
서류 보완 요청 시: 추가 1-2일

🎁 프로모션 지원 프로그램 안내
신규 파트너사 혜택
첫 공연 등록 시 수수료 50% 할인 (3개월간)
메인 페이지 배너 광고 무료 제공 (1회)
전용 고객관리자 배정

더 나은 서비스와 지원을 제공하기 위해 지속적으로 노력하겠습니다.
궁금한 사항이나 건의사항이 있으시면 언제든 연락주세요!

📧 이메일: partner@podopicker.co.kr
🕐 운영시간: 평일 09:00-18:00

함께 만들어가는 성공적인 파트너십을 기대합니다! 🎊`;

const MyPerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    // 나중에 API 연동 예정, 지금은 더미 데이터 사용
    setPerformances(dummyPerformances);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setPerformances(performances.filter((p) => p.id !== id));
  };

  // 페이지네이션 관련
  const totalPages = Math.ceil(performances.length / ITEMS_PER_PAGE);
  const pagedPerformances = performances.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="mypageContainer">
      <Header />
      <div className="mypageContent">
        <main className="main">
          <div
            className="noticeBox"
            onClick={() => setNoticeOpen(true)}
            style={{ cursor: "pointer" }}
            title="공지사항 더보기"
          >
            <strong>공지사항</strong>
            <span className="noticeContent">{noticeSummary}</span>
          </div>
          <div className="infoCardWrapper">
            <div
              className="cardHeader"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "10px",
              }}
            >
              <h2 className="title">등록 공연 관리</h2>
              <button
                className="addBtn"
                onClick={() => navigate("/manage/performance-form")}
              >
                공연 등록
              </button>
            </div>
            <div className="infoCard">
              <ul className="list">
                {pagedPerformances.map((p, idx) => (
                  <li key={p.id} className="listItem">
                    <span className="index">
                      {String((page - 1) * ITEMS_PER_PAGE + idx + 1).padStart(
                        3,
                        "0",
                      )}
                    </span>
                    <span className="info">
                      {p.title} - {p.location}
                    </span>
                    <button
                      className="deleteBtn"
                      onClick={() => handleDelete(p.id)}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`paginationBtn${page === i + 1 ? " active" : ""}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {noticeOpen && (
            <div
              className="noticeModalBackdrop"
              onClick={() => setNoticeOpen(false)}
            >
              <div className="noticeModal" onClick={(e) => e.stopPropagation()}>
                <div className="noticeContentDetail">
                  <p>
                    🎉 <strong>파트너사 여러분을 환영합니다!</strong>
                  </p>
                  <p>
                    포도피커와 함께 새로운 시작을 해주신 모든 공연 대행사
                    파트너사 여러분께 진심으로 감사드립니다.
                  </p>
                  <p>
                    여러분의 소중한 공연들이 더 많은 관객들과 만날 수 있도록
                    최선을 다하겠습니다.
                  </p>
                  <hr />
                  <p>
                    📢 <strong>시스템 공지사항</strong>
                  </p>
                  <p>
                    최근 업데이트: 2025년 5월 31일 - 공연 등록 시스템 최적화
                    완료
                  </p>
                  <p>예정된 점검: 매주 일요일 새벽 2:00-4:00 (정기 점검)</p>
                  <p>현재 상태: 모든 시스템 정상 운영 중</p>
                  <hr />
                  <p>
                    ⏰ <strong>공연 등록 마감일 및 검토 소요시간</strong>
                  </p>
                  <p>공연일 기준 최소 2주 전까지 등록 완료</p>
                  <p>대형 공연 (1,000석 이상): 8주 전까지 권장</p>
                  <p>
                    일반 공연: 영업일 기준 2-3일, 대형 공연: 영업일 기준 5-7일
                    (서류 보완 요청 시: 추가 1-2일)
                  </p>
                  <hr />
                  <p>
                    🎁 <strong>프로모션 지원 프로그램 안내</strong>
                  </p>
                  <p>신규 파트너사 혜택</p>
                  <p>첫 공연 등록 시 수수료 50% 할인 (3개월간)</p>
                  <p>메인 페이지 배너 광고 무료 제공 (1회)</p>
                  <p>전용 고객관리자 배정</p>
                  <hr />
                  <p>
                    문의사항이나 건의사항은 전담 매니저에게 연락주시면 신속히
                    도와드리겠습니다.{" "}
                  </p>
                  <p>함께 만들어가는 성공적인 파트너십을 기대합니다! 🎊</p>
                </div>
                <button
                  className="closeBtn"
                  onClick={() => setNoticeOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyPerformanceList;
