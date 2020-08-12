import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const MyQeustion = () => {
  const [show, setShow] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const handleClose = () => setShow(false);

  const handleEdit = e => {
    e.preventDefault();
  }

  const handleDelete = e => {
    e.preventDefault();
  }

  const handleAsk = e => {
    e.preventDefault();
    setShow(true);
  }

  const handleQuestionSave = e => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <h2>1:1 문의</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">문의제목</th>
            <th scope="col">상태</th>
            <th scope="col">수정하기</th>
            <th scope="col">삭제하기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>지도가 안보여요.</td>
            <td>대기중</td>
            <td>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleEdit}
              >
                수정하기
              </button>
            </td>
            <td>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleDelete}
              >
                삭제하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn btn-outline-secondary btn-block"
        onClick={handleAsk}
      >
        문의하기
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>문의하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>※사이트 이용과 관련된 문의를 남겨주세요.</p>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">제목</span>
              </div>
              <input 
                type="text" 
                className="form-control"
                value={questionTitle}
                onChange={e => setQuestionTitle(e.target.value)}
              />
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">내용</span>
              </div>
              <textarea 
                className="form-control"
                value={questionContent}
                onChange={e => setQuestionContent(e.target.value)}
              ></textarea>
            </div>
            <button
              className="btn btn-primary btn-block mt-2 mb-2"
              onClick={handleQuestionSave}
            >
              저장
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div >
  );
};

export default MyQeustion;