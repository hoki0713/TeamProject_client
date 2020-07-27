import React, { useState } from 'react';
import { PostcodeButton } from '../../../items';
import './AccountDetail.css';

const AccountDetail = () => {
  const [userId, seUserId] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [optionalAddress, setOptionalAddress] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = () => {

  };

  const handleDelete = () => {

  };

  return (
    <div className="container" id="account-detail">
      <div id="account-detail-title">
        <h3>나의 정보</h3>
      </div>

      <form>
        <div className="form-group">
          <p>아이디</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              readOnly
              value={userId}
            />
          </div>
          <p>비밀번호</p>
          <button className="btn btn-primary btn-block mb-2" >비밀번호 변경</button>
          <p>이름</p>
          <input
            type="text"
            className="form-control"
            readOnly
            value={name}
          />
          <p>생년월일</p>
          <input
            type="date"
            className="form-control"
            readOnly
            value={birthDate}
          />
          <p>성별</p>
          <input
            type="text"
            className="form-control"
            readOnly
            value={gender}
          />
          <p>거주지 주소</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={defaultAddress}
              onChange={e => setDefaultAddress(e.target.value)}
            />
            <div className="input-group-append">
              <PostcodeButton onPostcodeSelected={setDefaultAddress} />
            </div>
          </div>
          {optionalAddress &&
            <>
              <p>추가 주소</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={optionalAddress}
                  onChange={e => setOptionalAddress(e.target.value)}
                />
                <div className="input-group-append">
                  <PostcodeButton onPostcodeSelected={setOptionalAddress} />
                </div>
              </div>
            </>
          }

          {!optionalAddress &&
            <button 
              className="btn btn-primary btn-block mb-2" 
              id="account-detail-add-address-btn"
            >
              주소 추가 하기
            </button>
          }

          <p>이메일</p>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              readOnly
              value={email}
            />
            <button 
              className="btn btn-warning btn-block mb-2"
              id="account-detail-update-email-btn"
            >
              이메일 수정
            </button>
          </div>
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-success btn-block mb-2"
        onClick={handleUpdate}
      >
        수정
      </button>
      <button
        type="submit"
        className="btn btn-danger btn-block mb-2"
        onClick={handleDelete}
      >
        탈퇴
      </button>
    </div>
  );
};

export default AccountDetail;