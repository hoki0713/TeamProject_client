import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import StarRating from "./StarRating";
import axios from "axios";

const ReviewModal = ({
  handleClose,
  storeName,
  accountDetail,
  storeId,
  reviewId,
  onSubmit
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");
  const [storeNameModal, setStoreNameModal] = useState("");

  const [storeIdArr, setStoreIdArr] = useState([]);
  const [storeArr, setStoreArr] = useState([]);
  const [showFindStore, setShowFindStore] = useState(false);

  const [selectedStoreId, setSelectedStoreId] = useState("");

  const ratingClick = (e) => {
    setRatingValue(e.target.value);
  };

  const closeFindStore = () => setShowFindStore(false);

  const handlePickOneStore = (StoreId, storeInfo) => {
    setSelectedStoreId(StoreId);
    setStoreNameModal(storeInfo.storeName);
    closeFindStore();
  }

  const handleSelectStore = () => {
    setShowFindStore(true);
  };

  const handleSearchStore = (e) => {
    e.preventDefault();
    if(storeNameModal) {
      axios
      .get(`http://localhost:8080/stores/findStore/${storeNameModal}`)
      .then((response) => {
        const values = [];
        const keys = [];
        Object.entries(response.data).forEach(([key, value]) => {
          keys.push(key);
          values.push(value);
        });
        setStoreIdArr(keys);
        setStoreArr(values);
        handleSelectStore(storeIdArr, storeArr);
      })
      .catch((error) => {
        throw error;
      });
    } else {
      alert("상호명을 입력하세요.");
    }
    
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      userId: accountDetail.id,
      storeId: selectedStoreId,
      starRating: ratingValue,
      contents: review,
    };

    axios
      .post(`http://localhost:8080/posts/reviews/${selectedStoreId}`, data)
      .then(() => {
        alert("저장성공");
        setReview("");
        onSubmit();
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleSaveModi = (e) => {
    e.preventDefault();
    console.log(reviewId);
    const data = {
      starRating: ratingValue,
      contents: review,
    };
    console.log(data);
    axios
      .patch(`http://localhost:8080/posts/reviews/${reviewId}`, data)
      .then(() => {
        alert("수정완료");
        setReview("");
        onSubmit();
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    if(storeId) {
      setSelectedStoreId(storeId);
    }
    setStoreNameModal(storeName);
    setReview("");
  }, [storeName]);

  useEffect(() => {
    if (reviewId) {
      axios
        .get(`http://localhost:8080/posts/reviews/detail/${reviewId}`)
        .then((response) => {
          setRatingValue(response.data.starRating);
          setReview(response.data.contents);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [reviewId]);

  return (
    <>
      <Modal show={true} onHide={handleClose}>
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
                    value={storeNameModal}
                  />
                </div>
              </div>
            )}
            {!storeName && (
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">상호명</label>
                <div
                  className="col-sm-10 input-group"
                  style={{ "margin-top": "0px" }}
                >
                  <div className="input-group-prepend">
                    <span className="input-group-text">{selectedStoreId}</span>
                  </div>
                  <input
                    type="text"
                    readonly
                    className="form-control"
                    value={storeNameModal}
                    onChange={(e) => setStoreNameModal(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleSearchStore}
                    >
                      검색
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">평점</label>
              <div className="col-sm-10">
                <StarRating
                  ratingValue={ratingValue}
                  ratingClick={ratingClick}
                />
              </div>
            </div>
            {reviewId && (
              <>
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
                <div>
                  <button
                    className="btn btn-primary btn-block mb-2 mt-2"
                    onClick={handleSaveModi}
                  >
                    수정완료
                  </button>
                </div>
              </>
            )}
            {!reviewId && (
              <>
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
                <div>
                  <button
                    className="btn btn-primary btn-block mb-2 mt-2"
                    onClick={handleSave}
                  >
                    작성완료
                  </button>
                </div>
              </>
            )}
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showFindStore} onHide={closeFindStore}>
        <Modal.Header closeButton>
          <Modal.Title>가맹점 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">업체명</th>
                <th scope="col">주소</th>
                <th scope="col">선택</th>
              </tr>
            </thead>
            <tbody>
              {storeArr.map((info, i) => (
                <tr key={i}>
                  <td>{info.storeName}</td>
                  <td>{info.storeAddr}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => { handlePickOneStore(storeIdArr[i], info) }}
                    >
                      선택
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewModal;
