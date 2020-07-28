import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PostcodeButton } from '../../../items';
import { Modal } from 'react-bootstrap';
import './AccountDetail.css';
import axios from 'axios';

const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';
const PATCH_UPDATE_PASSWORD = 'PATCH_UPDATE_PASSWORD';
const PATCH_UPDATE_USER = 'PATCH_UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

export const accountInfoAction = data => ({type: GET_ACCOUNT_INFO, payload: data});
export const patchPasswordAction = data => ({type: PATCH_UPDATE_PASSWORD, payload: data});
export const patchUserAction = data => ({type: PATCH_UPDATE_USER, payload: data});
export const deleteUserAction = data => ({type: DELETE_USER, payload: data});

export const getAccountInfo = userId => dispatch => {
  axios.get(`http://localhost:8080/users/account-info/${userId}`)  // 나중에 id로 바꿔야함. 로그인할 때 sessionStore에 id 저장하기...
    .then(response => {
      dispatch(accountInfoAction(response.data));
    }).catch(
    error => { throw(error) }
  );
};

export const patchUpdatePassword = (id, data) => dispatch => {
  axios.patch(`http://localhost:8080/users/${id}`, data)
    .then(response => {
      dispatch(patchPasswordAction(response.data));
    }).catch(
    error => { throw (error) }
  );
};

export const patchUpdateUser = (id, data) => dispatch => {
  axios.patch(`http://localhost:8080/users/${id}`, data)
    .then(response => {
    dispatch(patchUserAction(response.data));
    }).catch(
      error => { throw (error)}
    );
};

export const deleteUser = id => dispatch => {
  axios.delete(`http://localhost:8080/users/${id}`)
    .then(response => {
      dispatch(deleteUserAction(response.data));
    }).catch(
      error => { throw (error)}
    );
};

export const accountDetailReducer = (state = {}, action) => {
  console.log("reducer running");
  console.log(action);
  switch(action.type) {
    case 'GET_ACCOUNT_INFO': return Object.assign({}, state, {
      accountInfo: action.payload
    });
    case 'PATCH_UPDATE_PASSWORD': return action.payload;
    case 'PATCH_UPDATE_USER': return action.payload;
    case 'DELETE_USER': return action.payload;
    default: return state;
  }
}


const AccountDetail = () => {
  const [id, setId] = useState("");
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
      setId(accountDetail.id);
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
    dispatch(patchUpdateUser(id, {defaultAddress: defaultAddress, optionalAddress: optionalAddress ,email: email}));
    alert("회원정보 수정이 완료되었습니다.");
    history.push("/");
  };

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteUser(id));
    alert("회원탈퇴 완료");
    history.push("/");
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
      dispatch(patchUpdatePassword(id, {password: newPassword}));
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