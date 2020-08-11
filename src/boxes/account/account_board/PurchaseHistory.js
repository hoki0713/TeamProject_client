import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./PurchaseHistory.css";
import axios from "axios";

const PurchaseHistory = () => {
  const [showUseVoucherModal, setShowUseVoucherModal] = useState(false);
  const [showSendVoucherModal, setShowSendVoucherModal] = useState(false);
  const [showVoucherDetailModal, setShowVoucherDetailModal] = useState(false);

  const [voucherCodeArr, setVoucherCodeArr] = useState([]);
  const [voucherInfoArr, setVoucherInfoArr] = useState([]);

  const [voucherName, setVoucherName] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [priceOfVoucher, setPriceOfVoucher] = useState("");
  const [email, setEmail] = useState("");
  const [salesDate, setSalesDate] = useState("");
  const [useDate, setUseDate] = useState("");
  const [cancelDate, setCancelDate] = useState("");
  const [currencyState, setCurrencyState] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const [id, setId] = useState("");
  const [accountDetail] = useState(
    JSON.parse(sessionStorage.getItem("accountDetail") || "{}")
  );

  const handleUseVoucherModalClose = () => setShowUseVoucherModal(false);
  const handleshowSendVoucherModalClose = () => setShowSendVoucherModal(false);
  const handleshowVoucherDetailModalClose = () =>
    setShowVoucherDetailModal(false);

  const handleUseVoucher = (info, voucherCode) => {
    setVoucherName(info.localCurrencyVoucherName);
    setVoucherCode(voucherCode);
    setPriceOfVoucher(info.unitPrice);
    setEmail(accountDetail.email);
    setShowUseVoucherModal(true);
  };

  const handleConfirmUseVoucher = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formatedMonth =
      currentDate.getMonth() + 1 > 10
        ? currentDate.getMonth() + 1
        : `0${currentDate.getMonth() + 1}`;
    const formatedDate =
      currentDate.getDate() >= 10
        ? currentDate.getDate()
        : `0${currentDate.getDate()}`;
    const formatedCurrentDate = `${currentDate.getFullYear()}-${formatedMonth}-${formatedDate}`;
    const data = {
      currencyState: "사용완료",
      useDate: formatedCurrentDate,
      recipientEmail: accountDetail.email,
    };
    axios
      .patch(`http://localhost:8080/sales/${voucherCode}`, data)
      .then((response) => {
        updateCurrencyStateInArr(voucherCode, response.data);
      })
      .catch((error) => {
        throw error;
      });
    setShowUseVoucherModal(false);
  };

  const updateCurrencyStateInArr = (voucherCode, data) => {
    const voucherCodeindex = voucherCodeArr.indexOf(voucherCode);
    const tempVoucherInfoArr = [...voucherInfoArr];
    tempVoucherInfoArr[voucherCodeindex].currencyState = data.currencyState;
    tempVoucherInfoArr[voucherCodeindex].useDate = data.useDate;
    tempVoucherInfoArr[voucherCodeindex].giftYn = data.giftYn;
    tempVoucherInfoArr[voucherCodeindex].recipientEmail = data.recipientEmail;
    setVoucherInfoArr(tempVoucherInfoArr);
  }

  const handleSendVoucher = (e) => {
    e.preventDefault();
    setRecipientEmail("");
    setShowUseVoucherModal(false);
    setShowSendVoucherModal(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowUseVoucherModal(false);
    setShowSendVoucherModal(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formatedMonth =
      currentDate.getMonth() + 1 > 10
        ? currentDate.getMonth() + 1
        : `0${currentDate.getMonth() + 1}`;
    const formatedDate =
      currentDate.getDate() >= 10
        ? currentDate.getDate()
        : `0${currentDate.getDate()}`;
    const formatedCurrentDate = `${currentDate.getFullYear()}-${formatedMonth}-${formatedDate}`;
    const data = {
      currencyState: "사용완료",
      useDate: formatedCurrentDate,
      recipientEmail: recipientEmail,
      giftYn: true,
    };
    axios
      .patch(`http://localhost:8080/sales/${voucherCode}`, data)
      .then((response) => {
        updateCurrencyStateInArr(voucherCode, response.data);
      })
      .catch((error) => {
        throw error;
      });
    setShowUseVoucherModal(false);
    setShowSendVoucherModal(false);
  };

  const handleShowVoucherDetail = (info, voucherCode) => {
    setVoucherName(info.localCurrencyVoucherName);
    setVoucherCode(voucherCode);
    setPriceOfVoucher(info.unitPrice);
    setSalesDate(info.salesDate);
    setUseDate(info.useDate);
    setCancelDate(info.cancelDate);
    setCurrencyState(info.currencyState);
    setIsGift(info.giftYn);
    setRecipientEmail(info.recipientEmail);
    setShowVoucherDetailModal(true);
  };

  useEffect(() => {
    setId(accountDetail.id);
  }, [accountDetail]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/sales/purchase-history/${id}`)
        .then((response) => {
          const keyArr = [];
          const valueArr = [];
          Object.entries(response.data).forEach(([key, value]) => {
            keyArr.push(key);
            valueArr.push(value);
          });
          setVoucherCodeArr(keyArr);
          setVoucherInfoArr(valueArr);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [id]);

  return (
    <div className="container">
      <h2>구매내역</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">일련번호</th>
            <th scope="col">지역화폐명</th>
            <th scope="col">금액</th>
            <th scope="col">상태</th>
            <th scope="col">사용하기</th>
            <th scope="col">상세정보</th>
          </tr>
        </thead>
        <tbody>
          {voucherInfoArr.map((info, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{voucherCodeArr[i]}</td>
              <td>{info.localCurrencyVoucherName}</td>
              <td>{info.unitPrice}</td>
              <td>{info.currencyState}</td>
              {info.currencyState !== "미사용" && (
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled
                    onClick={() => {
                      handleUseVoucher(info, voucherCodeArr[i]);
                    }}
                  >
                    사용하기
                  </button>
                </td>
              )}
              {info.currencyState === "미사용" && (
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      handleUseVoucher(info, voucherCodeArr[i]);
                    }}
                  >
                    사용하기
                  </button>
                </td>
              )}

              <td>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    handleShowVoucherDetail(info, voucherCodeArr[i]);
                  }}
                >
                  상세정보
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showUseVoucherModal} onHide={handleUseVoucherModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>지역화폐 사용하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>지역화폐명: {voucherName}</p>
            <p>지역화폐 코드 : {voucherCode}</p>
            <p>금액 : {priceOfVoucher}</p>
            <p>수신 이메일 : {email}</p>
            <p className="warningMsg">
              * 사용하기를 누른 후에는 취소가 불가능합니다.
            </p>
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

      <Modal
        show={showSendVoucherModal}
        onHide={handleshowSendVoucherModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>지역화폐 선물하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>지역화폐 코드 : {voucherCode}</p>
            <p>금액 : {priceOfVoucher}</p>
            <p>발신 이메일 : {email}</p>
            <div>
              <p>수신 이메일</p>
              <input
                type="email"
                className="form-control mb-2"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
            <p className="warningMsg">
              * 선물하기를 누른 후에는 취소가 불가능합니다.
            </p>
            <div id="modal-button-container">
              <button className="btn btn-primary mr-3" onClick={handleCancel}>
                취소하기
              </button>
              <button className="btn btn-warning ml-3" onClick={handleSend}>
                보내기
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showVoucherDetailModal}
        onHide={handleshowVoucherDetailModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>지역화폐 상품권 상세조회</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>지역화폐명 : {voucherName}</p>
            <p>지역화폐 코드 : {voucherCode}</p>
            <p>금액 : {priceOfVoucher}</p>
            <p>구매일자 : {salesDate}</p>
            {cancelDate && <p>취소일자 : {cancelDate}</p>}
            {!cancelDate && <p>사용일자 : {useDate}</p>}
            <p>상태 : {currencyState}</p>
            {isGift && <p>선물여부 : Y</p>}
            {!isGift && <p>선물여부 : N</p>}
            <p>수신이메일 : {recipientEmail}</p>
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
