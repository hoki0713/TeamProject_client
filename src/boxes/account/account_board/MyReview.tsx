import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const MyReview = () => {
  const [show, setShow] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [numOfRatingStar, setNumOfRatingStar] = useState("");

  const handleClose = () => setShow(false);

  const handleModify = e => {
    e.preventDefault();
    setShow(true);
  }

  const handleDelete = e => {
    e.preventDefault();
  }

  const handleAddReview = e => {
    e.preventDefault();
    setShow(true);
  }

  const handleSave = e => {
    e.preventDefault();
    setShow(false);
  }

  return (
    <div className="container">
      <h2>구매내역</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">업체명</th>
            <th scope="col">리뷰</th>
            <th scope="col">별점</th>
            <th scope="col">수정</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>비트분식</td>
            <td>맛있었다.</td>
            <td>★★★★★</td>
            <td>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleModify}
              >
                수정하기
              </button>
            </td>
            <td>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleDelete}
              >
                삭제하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <button
          className="btn btn-outline-primary btn-block"
          onClick={handleAddReview}
        >
          추가하기
        </button>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>내 리뷰 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <p>상호명</p>
              <input
                type="text"
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
              />
            </div>
            <div>
              <p>별점주기</p>
              <input
                type="text"
                value={numOfRatingStar}
                onChange={e => setNumOfRatingStar(e.target.value)}
              />
            </div>
            <div>
              <p>리뷰선택</p>
              <select className="custom-select" id="inputGroupSelect01">
                <option selected>선택하세요.</option>
                <option value="1">맛있었다.</option>
                <option value="2">보통이다.</option>
                <option value="3">별로다.</option>
              </select>
            </div>
            <button
              className="btn btn-primary btn-block mb-2 mt-2"
              onClick={handleSave}
            >
              작성완료
            </button>

          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default MyReview;