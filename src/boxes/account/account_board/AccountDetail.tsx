import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PostcodeButton } from '../../../items';
import { Modal } from 'react-bootstrap';
import './AccountDetail.css';
import axios from 'axios';

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
  const [accountDetail, setAccountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'));
  const [show, setShow] = useState(false);
  const [showOptionalAddress, setShowOptionalAddress] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const history = useHistory();

  const handleUpdate = e => {
    e.preventDefault();
    const data = { defaultAddr: defaultAddress, optionalAddr: optionalAddress, email: email };
    axios.patch(`http://localhost:8080/users/${id}`, data)
      .then(response => {
        sessionStorage.setItem("accountDetail", JSON.stringify(response.data));
        setAccountDetail(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'))
        alert("회원정보 수정이 완료되었습니다.");
      }).catch(
        error => { throw (error) }
      );
  };

  const handleDelete = e => {
    e.preventDefault();
    axios.delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        sessionStorage.clear();
        alert("회원탈퇴 완료");
        history.push("/");
      }).catch(
        error => { throw (error) }
      );
  };

  const handleChangePassword = e => {
    e.preventDefault();
    setShow(true);
  }

  const handleUpdatePassword = e => {
    e.preventDefault();
    axios.post(`http://localhost:8080/users/${id}`, { password: password })
      .then(() => {
        if (newPassword === confirmNewPassword) {
          axios.patch(`http://localhost:8080/users/${id}`, { password: newPassword })
            .then(() => {
              sessionStorage.clear();
              alert("비밀번호 변경이 완료되었습니다. 다시 로그인 하세요");
              history.push("/account/login");
            }).catch(
              error => {
                throw (error);
              });
        } else {
          alert("새로운 비밀번호를 다시 확인하세요.");
          setConfirmNewPassword("");
        }
      }).catch(error => {
        alert("현재 비밀번호가 일치하지 않습니다.");
        setPassword("");
        throw (error);
      });
  };

  const handleClose = () => setShow(false);

  const handleAddAddress = e => {
    e.preventDefault();
    setShowOptionalAddress(true);
  }

  const handleUpdateEmail = e => {
    e.preventDefault();
    setIsReadOnly(false);
  }

  useEffect(() => {
    setId(accountDetail.id);
    setUserId(accountDetail.userId);
    setName(accountDetail.name);
    setBirthDate(accountDetail.birthDate);
    setGender(accountDetail.gender);
    setDefaultAddress(accountDetail.defaultAddr);
    if (accountDetail.optionalAddr) setOptionalAddress(accountDetail.optionalAddr);
    setEmail(accountDetail.email);
  }, [accountDetail])

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
            {isReadOnly &&
              <input
                type="email"
                className="form-control"
                readOnly
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            }
            {!isReadOnly &&
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            }
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