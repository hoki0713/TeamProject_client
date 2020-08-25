import React, { useState, useEffect } from "react";
import "./StoreDetail.css";
import { PostcodeButton } from "../../../items";
import axios from "axios";

const StoreDetail = ({match}) => {
  const [isAfterChange, setIsAfterChange] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeType, setStoreType] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhone,setStorePhone] =useState("")
  const [isReadOnly, setIsReadOnly] = useState(true);

 
  useEffect(()=>{
    axios
      .get(`http://localhost:8080/admins/store/detail/${match.params.id}`)
      .then((res)=>{
        setStoreName(res.data.storeName)
        setStoreType(res.data.storeType)
        setStoreAddress(res.data.address)
        setStorePhone(res.data.storePhone)
          console.log(res.data)
      })
      .catch((err)=>{
        throw err;
      })
  },[])



  return (
    <div className="container store-detail-wrapper">
      <h1 className="storedetail-h1">가맹점 상세페이지</h1>

      <form>
        <p className="storedetail-h1"> 가맹점 관리번호: {match.params.id}</p>
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
                value={storePhone}
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

        {/* <p>별점:</p> */}
      </form>
    </div>
  );
};

export default StoreDetail;
