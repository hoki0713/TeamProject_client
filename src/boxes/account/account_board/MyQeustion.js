import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./MyQuestion.css";
import axios from "axios";
import Writer from "./Writer";

const MyQeustion = () => {
  const [questionIdArr, setQuestionIdArr] = useState([]);
  const [userQuestionArr, setUserQuestionArr] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [selectedQuestionTitle, setSelectedQuestionTitle] = useState("");
  const [selectedQuestionContents, setSelectedQuestionContents] = useState("");

  const [questionTitle, setQuestionTitle] = useState("");
  const [contents, setContents] = useState("");
  const [selectedQuestionComment, setSelectedQuestionComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [show, setShow] = useState(false);
  const [accountDetail] = useState(
    JSON.parse(sessionStorage.getItem("accountDetail") || "{}")
  );
  const [id, setId] = useState("");

  const handleQuestionSave = () => {
    const data = {
      contents: contents,
      postTitle: questionTitle,
    };
    axios
      .post(`http://localhost:8080/posts/questions/${id}`, data)
      .then(() => {
        alert("문의완료");
        refreshList(id);
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleClose = () => {
    setQuestionId("");
    setSelectedQuestionContents("");
    setSelectedQuestionTitle("");
    setSelectedQuestionComment("");
    setIsEdit(false);
    setShow(false);
  };

  const handleEdit = (qId, info) => {
    setIsEdit(true);
    setQuestionId(qId);
    setSelectedQuestionTitle(info.postTitle);
    setSelectedQuestionContents(info.contents);
    setSelectedQuestionComment(info.comment);
    setShow(true);
  };

  const handleQuestionEdit = (questionId) => {
    const data = {
      contents: selectedQuestionContents,
      postTitle: questionTitle,
    };
    axios
      .patch(`http://localhost:8080/posts/questions/${questionId}`, data)
      .then(() => {
        alert("수정완료");
        refreshList(id);
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleDelete = (questionId) => {
    axios
      .delete(`http://localhost:8080/posts/questions/${questionId}`)
      .then(() => {
        alert("삭제완료");
        refreshList(id);
      })
      .catch((error) => {
        throw error;
      })
  };

  const handleQuestionDetail = (qId, info) => {
    setQuestionId(qId);
    setSelectedQuestionTitle(info.postTitle);
    setSelectedQuestionContents(info.contents);
    setSelectedQuestionComment(info.comment);

    setShow(true);
  };

  const handleAsk = (e) => {
    e.preventDefault();
    setShow(true);
  };

  useEffect(() => {
    setId(accountDetail.id);
  }, [accountDetail]);

  const refreshList = (id) => {
    axios
      .get(`http://localhost:8080/posts/questions/${id}`)
      .then((response) => {
        const values = [];
        const keys = [];
        Object.entries(response.data).forEach(([key, value]) => {
          keys.push(key);
          values.push(value);
        });
        setQuestionIdArr(keys);
        setUserQuestionArr(values);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    if (id) {
      refreshList(id);
    }
  }, [id]);

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
          {userQuestionArr.map((info, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td
                className="question-title"
                onClick={() => {
                  handleQuestionDetail(questionIdArr[i], info);
                }}
              >
                {info.postTitle}
              </td>
              <td>
                {!info.comment && "처리중"}
                {info.comment && "답변완료"}
              </td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    handleEdit(questionIdArr[i], info);
                  }}
                >
                  수정하기
                </button>
              </td>

              <td>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    handleDelete(questionIdArr[i]);
                  }}
                >
                  삭제하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-outline-secondary btn-block"
        onClick={handleAsk}
      >
        문의하기
      </button>

      {show && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>문의하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>※사이트 이용과 관련된 문의를 남겨주세요.</p>
            {questionId && (
              <>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text pr-3">제목</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={selectedQuestionTitle}
                  />
                </div>

                {isEdit && (
                  <>
                    <div className="question" style={{ height: "400px" }}>
                      <Writer
                        contents={selectedQuestionContents}
                        changeContents={(value) =>
                          setSelectedQuestionContents(value)
                        }
                        isNew={true}
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-block mt-2 mb-2"
                        onClick={() => handleQuestionEdit(questionId)}
                      >
                        수정
                      </button>
                    </div>
                  </>
                )}
                {!isEdit && (
                  <div className="question" style={{ height: "400px" }}>
                    <Writer contents={selectedQuestionContents} isNew={false} />
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">답변</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={selectedQuestionComment}
                        style={{ height: "120px" }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {!questionId && (
              <>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">제목</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                  />
                </div>
                <div className="question" style={{ height: "400px" }}>
                  <Writer
                    contents={contents}
                    changeContents={(value) => setContents(value)}
                    isNew={true}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-block mt-2 mb-2"
                    onClick={handleQuestionSave}
                  >
                    저장
                  </button>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default MyQeustion;
