import React, { useState } from "react";
import "./StoreDetail.css";
import { PostcodeButton } from "../../../items";
import axios from "axios";

const StoreDetail = () => {
  const [isAfterChange, setIsAfterChange] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeType, setStoreType] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleSetChange = (e) => {
    e.preventDefault();
    setIsAfterChange(!isAfterChange);
    setIsReadOnly(!isReadOnly);
  };

  const handleChangeSave = (e) => {
    e.preventDefault();
    const data: any = {
      storeName: storeName,
      storeType: storeType,
      storeAddress: storeAddress,
    };
    axios
      .patch(``, data)
      .then((response) => {
        alert("저장완료");
      })
      .catch((error) => {
        throw error;
      });
  };

  const a = {
    no: 1,
  };



  return (
    <div className="container store-detail-wrapper">
      <h1 className="storedetail-h1">가맹점 상세페이지</h1>

      <form>
        <p className="storedetail-h1"> 가맹점 관리번호: {a.no}</p>
        {isReadOnly && (
          <>
            <div className="contents-box">
              <p>상호명</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={storeName}
                  readOnly
                />
              </div>
            </div>

            <div className="contents-box">
              <p>업종</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={storeType}
                  readOnly
                />
              </div>
            </div>

            <div className="contents-box">
              <p>도로명 주소</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={storeAddress}
                  readOnly
                />
              </div>
            </div>

            <div className="contents-box">
              <p>전화번호</p>
              <input
                type="text"
                className="form-control"
                value={storeAddress}
                readOnly
              />
            </div>
          </>
        )}
        {!isReadOnly && (
          <>
            <div className="contents-box">
              <p>상호명</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
            </div>

            <div className="contents-box">
              <p>업종</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                />
              </div>
            </div>

            <div className="contents-box">
              <p>도로명 주소</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                />
                <div className="input-group-append">
                  <PostcodeButton onPostcodeSelected={setStoreAddress} />
                </div>
              </div>
            </div>

            <div className="contents-box">
              <p>전화번호</p>
              <input
                type="text"
                className="form-control"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
              />
            </div>
          </>
        )}

        <p>별점:</p>
        <div className="contents-box">
          {isAfterChange && (
            <button
              className="btn btn-success btn-block"
              type="submit"
              onClick={handleChangeSave}
            >
              저장하기
            </button>
          )}
          {!isAfterChange && (
            <button
              className="btn btn-warning btn-block"
              type="submit"
              onClick={handleSetChange}
            >
              수정하기
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StoreDetail;
