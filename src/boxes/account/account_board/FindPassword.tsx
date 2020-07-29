import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FindIdPasswordLink } from '../../../items';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './FindIdAndPassword.css';


const FindPassword = () => {
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleResetPassword = e => {
    e.preventDefault();
    axios.get(`http://localhost:8080/users/checkUserForResetPassword?userId=${userId}&name=${name}&email=${email}`)
      .then( response => {
        setId(response.data.id);
        setShow(true);
      }).catch(error => { throw (error) });
  };
  
  const handleSaveNewPassword = e => {
    e.preventDefault();
    if( newPassword === confirmNewPassword ) {
      axios.patch(`http://localhost:8080/users/${id}`, {password: newPassword})
        .then( () => {
          alert("비밀번호가 재설정되었습니다. 다시 로그인하세요.");
          history.push("/account/login");
        }).catch(error => { throw (error) });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      setNewPassword("");
    };
  };

  return (
    <div className="container contents">
      <FindIdPasswordLink />
      <p>비밀번호 재설정</p>
      <div>
        <div>
          <p className="inline-block-label">아이디</p>
          <input
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
        </div>
        <div>
          <p className="inline-block-label">이름</p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <p className="inline-block-label">이메일</p>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          type="submit"
          onClick={handleResetPassword}
        >
          확인
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 재설정하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
              onClick={handleSaveNewPassword}
            >
              비밀번호 재설정
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FindPassword;