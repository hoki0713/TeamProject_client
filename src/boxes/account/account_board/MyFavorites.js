import React, { useState, useEffect } from "react";
import { ReviewModal } from "../../../items";
import axios from "axios";

const MyFavorites = () => {
  const [storeIdArr, setStoreIdArr] = useState([]);
  const [userFavoritesArr, setUserFavoritesArr] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [show, setShow] = useState(false);
  const [accountDetail] = useState(
    JSON.parse(sessionStorage.getItem("accountDetail") || "{}")
  );
  const [id, setId] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleWriteReview = (storeId, info) => {
    setStoreId(storeId);
    setStoreName(info.storeName);
    setShow(true);
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
      <ReviewModal 
        show={show} 
        handleClose={handleClose} 
        accountDetail={accountDetail} 
        storeName={storeName} 
        storeId={storeId} 
      />
      
    </div>
  );
};

export default MyFavorites;
