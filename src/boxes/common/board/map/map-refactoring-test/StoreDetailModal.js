import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ReviewModal } from "../../../../../items";
import StoreReportModal from "./StoreReportModal";
import { Modal, Container, Row, Col } from "react-bootstrap";
import "./map.css";
import { red, review, addr, phoneB, favStar } from "../mapIcons/imgIndex";
import axios from "axios";

const StoreDetailModal = ({
  handleClose,
  storeId,
  storeInfo,
  accountDetail,
}) => {
  const [reportModalShow, setReportModalShow] = useState(false);
  const [reviewModalShow, setReviewModalShow] = useState(false);
  const history = useHistory();

  const handleReportModalClose = () => {
    handleClose();
    setReportModalShow(false);
  };

  const handleReviewModalClose = () => {
    setReviewModalShow(false);
  };

  const handleAddFavoriteStore = () => {
    const data = {
      userId: accountDetail.id,
      storeId: storeId,
    };
    axios
      .post(`http://localhost:8080/favorites`, data)
      .then(() => {
        alert("즐겨찾기에 추가되었습니다.");
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div>
      <Modal
        show={true}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <img
              src={storeInfo.icon}
              alt={"commonStoreImg"}
              width={40}
              height={40}
            />
            <span>{storeInfo.storeName}</span>
            {storeInfo.reportedCount > 0 && (
              <span style={{color:"red", "font-size": "10px"}}>( 누적 신고 횟수 : {storeInfo.reportedCount} )</span>
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={8}>
                <span>
                  <img src={addr} alt={"addrImg"} width={25} height={25} />
                </span>
                <span>{storeInfo.address}</span>
                <span>
                  <img src={phoneB} alt={"phoneImg"} width={25} height={25} />
                </span>
                <span>
                  {storeInfo.storePhone !== 0
                    ? storeInfo.storePhone
                    : "000-000-0000"}
                </span>
              </Col>
              <Col xs={6} md={4}>
                <img
                  src={storeInfo.imgUrl}
                  alt={storeInfo.storeName}
                  width={80}
                  height={80}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                {storeInfo.storeType}
              </Col>
              <Col xs={6} md={4}>
                <span>별점 :</span>
                <span>
                  <img
                    src="https://media.istockphoto.com/vectors/five-stars-rating-vector-id1152705981"
                    alt="별점"
                    width={50}
                    height={30}
                  />
                </span>
              </Col>
              <Col xs={6} md={4}>
                {accountDetail && (
                  <>
                    <div
                      className="row"
                      onClick={() => {
                        setReportModalShow(true);
                      }}
                    >
                      <span>
                        <img src={red} alt="신고" width={25} height={25} />
                      </span>
                      <span>신고하기</span>
                    </div>
                    <div className="row" onClick={handleAddFavoriteStore}>
                      <span>
                        <img
                          src={favStar}
                          alt="즐겨찾기"
                          width={25}
                          height={25}
                        />
                      </span>
                      <span>즐겨찾기</span>
                    </div>
                    <div
                      className="row"
                      onClick={() => {
                        setReviewModalShow(true);
                      }}
                    >
                      <span>
                        <img src={review} alt="리뷰" width={25} height={25} />
                      </span>
                      <span>리뷰작성</span>
                    </div>
                  </>
                )}
                {!accountDetail && (
                  <p>
                    <span onClick={history("/account/login")}>로그인</span>{" "}
                    하시면 더 많은 활동을 할 수 있어요.
                  </p>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      {reportModalShow && (
        <StoreReportModal
          storeId={storeId}
          storeInfo={storeInfo}
          handleClose={handleReportModalClose}
        />
      )}
      {reviewModalShow && (
        <ReviewModal
          accountDetail={accountDetail}
          storeId={storeId}
          storeName={storeInfo.storeName}
          handleClose={handleReviewModalClose}
          onSubmit={handleClose}
        />
      )}
    </div>
  );
};

export default StoreDetailModal;
