import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PostcodeButton } from '../../../items';
import { Modal } from 'react-bootstrap';
import './AccountDetail.css';
import axios from 'axios';

const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';
const POST_UPDATE_PASSWORD = 'POST_UPDATE_PASSWORD';

export const accountInfoAction = data => ({type: GET_ACCOUNT_INFO, payload: data});
export const updatePasswordAction = data => ({type: POST_UPDATE_PASSWORD, payload:data});

export const getAccountInfo = userId => dispatch => {
  axios.get(`http://localhost:8080/users/account-info/${userId}`)
  .then( response => {
      dispatch(accountInfoAction(response.data));
    }
  ).catch(
    error => { throw(error) }
  );
};

export const postUpdatePassword = data => dispatch => {
  axios.post(`http://localhost:8080/users/updatePassword`, data).then(
    response => {
      dispatch(updatePasswordAction(response.data));
    }
  ).catch(
    error => { throw (error) }
  );
};

export const accountDetailReducer = (state = {}, action) => {
  console.log("reducer running");
  console.log(action);
  switch(action.type) {
    case 'GET_ACCOUNT_INFO': return Object.assign({}, state, {
      accountInfo: action.payload
    });
    case 'POST_UPDATE_PASSWORD': return action.payload;
    default: return state;
  }
}


const AccountDetail = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [optionalAddress, setOptionalAddress] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [showOptionalAddress, setShowOptionalAddress] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const history = useHistory();

  const accountDetail = useSelector((state: any) => state.accountInfo);
  const dispatch = useDispatch();

  useEffect(() => {

    if(!accountDetail) {
      dispatch(getAccountInfo("YwIvRY56"));
      
    } else {
      setUserId(accountDetail.userId);
      setName(accountDetail.name);
      setBirthDate(accountDetail.birthDate);
      setGender(accountDetail.gender);
      console.log(accountDetail);
    }
  },[accountDetail])

  const handleClose = () => setShow(false);

  const handleUpdate = e => {
    e.preventDefault();
  };

  const handleDelete = () => {

  };

  const handleAddAddress = e => {
    e.preventDefault();
    setShowOptionalAddress(true);
  }

  const handleChangePassword = e => {
    e.preventDefault();
    setShow(true);
  }

  const handleUpdatePassword = e => {
    e.preventDefault();
    if(newPassword === confirmNewPassword) {
      dispatch(postUpdatePassword({userId: userId, password: newPassword}));
      alert("비밀번호 변경이 완료되었습니다. 다시 로그인 하세요");
      history.push("/account/login");
    } else {
      alert("새로운 비밀번호를 다시 확인하세요.");
      setConfirmNewPassword("");
    }
  }

  const handleUpdateEmail = e => {
    e.preventDefault();
    setIsReadOnly(!isReadOnly);
  }

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
          <button
            className="btn btn-primary btn-block mb-2"
            onClick={handleChangePassword}
          >
            비밀번호 변경
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>비밀번호 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div>
                  <p className="change-password-modal-p">현재 비밀번호</p>
                  <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                  />
                </div>
                <div>
                  <p className="change-password-modal-p">새 비밀번호</p>
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <p className="change-password-modal-p">새 비밀번호 확인</p>
                  <input 
                    type="password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <button 
                  className="btn btn-primary btn-block mb-2 mt-2"
                  onClick={handleUpdatePassword}
                >
                  비밀번호 변경하기
                </button>

              </div>
            </Modal.Body>
          </Modal>

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
            <>
              {showOptionalAddress &&
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
              <button
                className="btn btn-primary btn-block mb-2"
                id="account-detail-add-address-btn"
                onClick={handleAddAddress}
              >
                주소 추가 하기
              </button>

            </>
          }

          <p>이메일</p>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              readOnly={isReadOnly}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="btn btn-warning btn-block mb-2"
              id="account-detail-update-email-btn"
              onClick={handleUpdateEmail}
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