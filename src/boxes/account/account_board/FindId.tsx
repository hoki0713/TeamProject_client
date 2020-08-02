import React, { useState } from 'react';
import { FindIdPasswordLink } from '../../../items';
import { Modal } from 'react-bootstrap';
import './FindIdAndPassword.css';
import axios from 'axios';

const FindId = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleCheck = e => {
    e.preventDefault();
    handleClose();
  }

  const handleFindId = e => {
    e.preventDefault();
    axios.get(`http://localhost:8080/users/findId?name=${name}&email=${email}`)
      .then(response => {
        setUserId(response.data.userId);
        setJoinDate(response.data.joinDate);
        setShow(!show);
      }).catch(error => { throw (error) });
  }

  return (
    <div className="container contents">
      <FindIdPasswordLink />
      <p>회원정보에 등록된 이메일로 찾기</p>
      <div>
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
          onClick={handleFindId}
        >
          확인
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>아이디 찾기 결과</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <p>아이디</p>
              <p>{userId}</p>
              <p>가입일</p>
              <p>{joinDate}</p>
            </div>
            <button
              className="btn btn-primary btn-block mb-2 mt-2"
              onClick={handleCheck}
            >
              확인
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FindId;