import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { StarRating } from "../../../items";
import axios from "axios";

const MyFavorites = () => {
  const [storeIdArr, setStoreIdArr] = useState([]);
  const [userFavoritesArr, setUserFavoritesArr] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [storeId, setStoreId] = useState("");
  const [review, setReview] = useState("");
  const [show, setShow] = useState(false);
  const [accountDetail] = useState(
    JSON.parse(sessionStorage.getItem("accountDetail") || "{}")
  );
  const [id, setId] = useState("");

  const handleClose = () => {
    setReview("");
    setShow(false);
  };

  const history = useHistory();

  const handleWriteReview = (storeId, info) => {
    setStoreId(storeId);
    setStoreName(info.storeName);
    setShow(true);
  };

  const ratingClick = (e) => {
    setRatingValue(e.target.value);
  }

  const handleSave = (e) => {
    e.preventDefault();
    const data = { 
      userId: accountDetail.id, 
      storeId: storeId, 
      rating: ratingValue, 
      contents: review 
    };
    axios.post(`http://localhost:8080/posts/reviews/${storeId}`, data)
      .then(() => {
        alert("저장성공")
        setShow(false)
      }).catch(error => {
        throw error
      })
  };

  useEffect(() => {
    setId(accountDetail.id);
  }, [accountDetail]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/favorites/${id}`)
        .then((response) => {
          const values = [];
          const keys = [];
          Object.entries(response.data).forEach(([key, value]) => {
            keys.push(key);
            values.push(value);
          });
          setStoreIdArr(keys);
          setUserFavoritesArr(values);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [id]);

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
          </tr>
        </thead>
        <tbody>
          {userFavoritesArr.map((info, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{info.storeName}</td>
              <td>{info.storeAddr}</td>
              <td>{info.storePhoneNumber}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    handleWriteReview(storeIdArr[i], info);
                  }}
                >
                  리뷰쓰기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>내 리뷰 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">상호명</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={storeName}
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">평점</label>
              <div class="col-sm-10">
                <StarRating ratingValue={ratingValue} ratingClick={ratingClick}/>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">리뷰</label>
              <div class="col-sm-10">
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
    </div>
  );
};

export default MyFavorites;
