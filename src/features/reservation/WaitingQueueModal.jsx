import React from "react";
import "./WaitingQueueModal.css";

const WaitingQueueModal = ({ position, estimatedTime }) => {
  return (
    <div className="waiting-modal-overlay">
      <div className="waiting-modal">
        <div className="waiting-content">
          <div className="waiting-animation">
            <div className="loading-spinner"></div>
          </div>
          <h2>예매 대기 안내</h2>
          <div className="waiting-info">
            <p>
              현재 대기 순번: <strong>{position}번</strong>
            </p>
            <p>
              예상 대기 시간: <strong>{estimatedTime}분</strong>
            </p>
          </div>
          <div className="waiting-tips">
            <p>
              원활한 예매를 위해 <strong>새로고침</strong> 및{" "}
              <strong>여러 창/탭에서의 중복 접속</strong>을 삼가주시기 바랍니다.
            </p>
            <p>순번이 되면 자동으로 예매가 진행됩니다. 잠시만 기다려 주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingQueueModal;
