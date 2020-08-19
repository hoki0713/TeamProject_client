import React, { useState, useEffect } from "react";
import { ReviewModal } from "../../../items";
import axios from "axios";

const MyReview = () => {
  const [userReviewArr, setUserReviewArr] = useState([]);
  const [reviewIdArr, setReviewIdArr] = useState([]);
  const [reviewId, setReviewId] = useState("");

  const [show, setShow] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [accountDetail] = useState(
    JSON.parse(sessionStorage.getItem("accountDetail") || "{}")
  );
  const [id, setId] = useState("");

  const handleClose = () => {
    setShow(false);
    setReviewId("");
    setStoreName("");
    setStoreId("");
  };

  const handleModifyReview = (reviewId, info) => {
    setStoreId(info.storeId);
    setStoreName(info.storeName);
    setReviewId(reviewId);
    setShow(true);
  };

  const handleDelete = (reviewId) => {
    axios
      .delete(`http://localhost:8080/posts/reviews/${reviewId}`)
      .then(() => {
        alert("삭제완료");
        refreshList(id);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const showRatingStars = (numOfStars) => {
    let stars = "";
    for (let i = 0; i < numOfStars; i++) {
      stars += "★";
    }
    if (5 - numOfStars) {
      for (let i = 0; i < 5 - numOfStars; i++) {
        stars += "☆";
      }
    }
    return stars;
  };

  useEffect(() => {
    setId(accountDetail.id);
  }, [accountDetail]);

  const refreshList = (id) => {
    axios
      .get(`http://localhost:8080/posts/reviews/${id}`)
      .then((response) => {
        const values = [];
        const keys = [];
        Object.entries(response.data).forEach(([key, value]) => {
          keys.push(key);
          values.push(value);
        });
        setReviewIdArr(keys);
        setUserReviewArr(values);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    if (id) {
      refreshList(id);
    }
  }, [id]);

  return (
    <div className="container">
      <h2 className="mt-4" style={{"text-align" : "center"}}>내 리뷰</h2>
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
          {userReviewArr.map((info, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{info.storeName}</td>
              <td>{info.contents}</td>
              <td>{showRatingStars(info.starRating)}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    handleModifyReview(reviewIdArr[i], info);
                  }}
                >
                  수정하기
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    handleDelete(reviewIdArr[i]);
                  }}
                >
                  삭제하기
                </button>
              </td>
            </tr>
          ))}
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
      {show && (
        <ReviewModal
          handleClose={handleClose}
          storeName={storeName}
          accountDetail={accountDetail}
          storeId={storeId}
          reviewId={reviewId}
          onSubmit={() => refreshList(id)}
        />
      )}
    </div>
  );
};

export default MyReview;
