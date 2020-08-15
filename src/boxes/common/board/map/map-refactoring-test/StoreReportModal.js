import React from "react";
import { Modal } from "react-bootstrap";
import "./map.css";
import axios from "axios";

const StoreReportModal = ({ handleClose, storeId, storeInfo }) => {

  const handleReport = () => {
    axios
      .post(`http://localhost:8080/reports/${storeId}`)
      .then(() => {
        alert(`${storeInfo.storeName}에 대한 신고가 완료되었습니다.`);
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>가맹점 신고하기</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ "text-align": "center" }}>
          <img
            src={
              "https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"
            }
            alt="신고"
            width={40}
            height={40}
          />
          <br />
          &nbsp; <h4>{storeInfo.storeName}</h4>&nbsp;에서 지역화폐를 받지
          않습니까?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleReport}>
            신고하기
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StoreReportModal;
