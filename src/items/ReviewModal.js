import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import StarRating from "./StarRating";
import axios from "axios";

const ReviewModal = ({
  show,
  handleClose,
  storeName,
  accountDetail,
  storeId,
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");

  const ratingClick = (e) => {
    setRatingValue(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      userId: accountDetail.id,
      storeId: storeId,
      starRating: ratingValue,
      contents: review,
    };
    axios
      .post(`http://localhost:8080/posts/reviews/${storeId}`, data)
      .then(() => {
        alert("저장성공");
        setReview("");
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>내 리뷰 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {storeName && (
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">상호명</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  value={storeName}
                />
              </div>
            </div>
          )}
          {!storeName && (
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">상호명</label>
              <div className="col-sm-10 input-group" style={{"margin-top" : "0px"}}>
                <div className="input-group-prepend">
                  <span className="input-group-text">{storeId}</span>
                </div>
                <input
                  type="text"
                  readonly
                  className="form-control"
                  value={storeName}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-primary">검색</button>
                </div>
              </div>
            </div>
          )}
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">평점</label>
            <div className="col-sm-10">
              <StarRating ratingValue={ratingValue} ratingClick={ratingClick} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">리뷰</label>
            <div className="col-sm-10">
              <textarea
                rows="5"
                className="form-control"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div>
          <button
            className="btn btn-primary btn-block mb-2 mt-2"
            onClick={handleSave}
          >
            작성완료
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;
