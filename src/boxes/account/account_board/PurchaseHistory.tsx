import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './PurchaseHistory.css';

const PurchaseHistory = () => {
  const [showUseVoucherModal, setShowUseVoucherModal] = useState(false);
  const [showSendVoucherModal, setShowSendVoucherModal] = useState(false);
  const [showVoucherDetailModal, setShowVoucherDetailModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [priceOfVoucher, setPriceOfVoucher] = useState("");
  const [email, setEmail] = useState("");
  const [salesDate, setSalesDate] = useState("");
  const [currencyState, setCurrencyState] = useState("");

  const handleUseVoucherModalClose = () => setShowUseVoucherModal(false);
  const handleshowSendVoucherModalClose = () => setShowSendVoucherModal(false);
  const handleshowVoucherDetailModalClose = () => setShowVoucherDetailModal(false);

  const handleUseVoucher = e => {
    e.preventDefault();
    setShowUseVoucherModal(true);
  }

  const handleConfirmUseVoucher = e => {
    e.preventDefault();
    setShowUseVoucherModal(false);
  }

  const handleSendVoucher = e => {
    e.preventDefault();
    setShowUseVoucherModal(false);
    setShowSendVoucherModal(true);
  }

  const handleCancel = e => {
    e.preventDefault();
    setShowUseVoucherModal(false);
    setShowSendVoucherModal(false);
  }

  const handleSend = e => {
    e.preventDefault();
    setShowUseVoucherModal(false);
    setShowSendVoucherModal(false);
  }

  const handleShowVoucherDetail = e => {
    e.preventDefault();
    setShowVoucherDetailModal(true);

  }


  return (
    <div className="container">
      <h2>구매내역</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">지역화폐명</th>
            <th scope="col">금액</th>
            <th scope="col">상태</th>
            <th scope="col">사용하기</th>
            <th scope="col">상세정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>의정부사랑상품권</td>
            <td>5000원</td>
            <td>미사용</td>
            <td>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleUseVoucher}
              >
                사용하기
              </button>
            </td>
            <td>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleShowVoucherDetail}
              >
                상세정보
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal show={showUseVoucherModal} onHide={handleUseVoucherModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>지역화폐 사용하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>지역화폐 코드 : {voucherCode}</p>
            <p>금액 : {priceOfVoucher}</p>
            <p>수신 이메일 : {email}</p>
            <p className="warningMsg">* 사용하기를 누른 후에는 취소가 불가능합니다.</p>
            <div id="modal-button-container">
              <button
                className="btn btn-primary mr-3"
                onClick={handleConfirmUseVoucher}
              >
                사용하기
              </button>
              <button
                className="btn btn-warning ml-3"
                onClick={handleSendVoucher}
              >
                선물하기
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showSendVoucherModal} onHide={handleshowSendVoucherModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>지역화폐 선물하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>지역화폐 코드 : {voucherCode}</p>
            <p>금액 : {priceOfVoucher}</p>
            <p>발신 이메일 : {email}</p>
            <div>
              <p>받는 사람</p>
              <input type="text" />
              <p>이메일</p>
              <input type="email" />
            </div>
            <p className="warningMsg">
              * 선물하기를 누른 후에는 취소가 불가능합니다.
            </p>
            <div id="modal-button-container">
              <button
                className="btn btn-primary mr-3"
                onClick={handleCancel}
              >
                취소하기
              </button>
              <button
                className="btn btn-warning ml-3"
                onClick={handleSend}
              >
                보내기
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showVoucherDetailModal} onHide={handleshowVoucherDetailModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>지역화폐 상품권 상세조회</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>지역화폐 코드 : {voucherCode}</p>
            <p>금액 : {priceOfVoucher}</p>
            <p>구매일시: {salesDate}</p>
            <p>상태 : {currencyState}</p>
            <button
              className="btn btn-warning ml-3"
              onClick={handleshowVoucherDetailModalClose}
            >
              확인
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PurchaseHistory;