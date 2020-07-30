import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const MyFavorites = () => {
  const [storeName, setStoreName] = useState("비트분식");
  const [numOfRatingStar, setNumOfRatingStar] = useState("★★★★★");
  const [merchantAddress, setMerchantAddress] = useState("서울시 여러분 담배꽁초");
  const [merchantPhoneNumber, setMerchantPhoneNumber] = useState("02-0000-0000");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const history = useHistory();

  const handleWriteReview = e => {
    e.preventDefault();
    setShow(true);
  }

  const handleReport = e => {
    e.preventDefault();
    
  }
  
  const handleSave = e => {
    e.preventDefault();
    setShow(false);
    history.push("/mypage/my-review");
  }

  return (
    <div className="container">
      <h2>즐겨찾기</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">업체명</th>
            <th scope="col">주소</th>
            <th scope="col">전화번호</th>
            <th scope="col">리뷰쓰기</th>
            <th scope="col">신고하기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{storeName}</td>
            <td>{merchantAddress}</td>
            <td>{merchantPhoneNumber}</td>
            <td>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleWriteReview}
              >
                리뷰쓰기
              </button>
            </td>
            <td>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleReport}
              >
                신고하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>

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

export default MyFavorites;