import React, { useState, useEffect } from "react";
import { PaginationItem } from "../../../items";
import "./AdminBoard.css";
import axios from "axios";
import { Writer } from "../../account/account_board";
import { Modal } from "react-bootstrap";

const Enquiry = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [questionIdArr, setQuestionIdArr] = useState([]);
  const [userQuestionArr, setUserQuestionArr] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const [questionId, setQuestionId] = useState("");
  const [selectedQuestionTitle, setSelectedQuestionTitle] = useState("");
  const [selectedQuestionContents, setSelectedQuestionContents] = useState("");
  const [selectedQuestionComment, setSelectedQuestionComment] = useState("");

  const [isWritingAnswer, setIsWritingAnswer] = useState(false);
  const [show, setShow] = useState("");

  const handleClose = () => {
    setQuestionId("");
    setSelectedQuestionContents("");
    setSelectedQuestionTitle("");
    setSelectedQuestionComment("");
    setIsWritingAnswer(false);
    setShow(false);
  };

  const handleSearch = () => {
    refreshList(selectedOption, searchWord);
    setSearchWord("");
  };

  const handleQuestionDetail = (qId, info) => {
    setQuestionId(qId);
    setSelectedQuestionTitle(info.postTitle);
    setSelectedQuestionContents(info.contents);
    setSelectedQuestionComment(info.comment);
    setShow(true);
  };

  const handleReply = (qId, info) => {
    setQuestionId(qId);
    setSelectedQuestionTitle(info.postTitle);
    setSelectedQuestionContents(info.contents);
    setSelectedQuestionComment(info.comment);
    setIsWritingAnswer(true);
    setShow(true);
  };

  const handleSaveAnswer = (qId) => {
    const data = {
      comment: selectedQuestionComment,
    };
    axios
      .patch(`http://localhost:8080/posts/questions/${qId}`, data)
      .then(() => {
        alert("답변완료");
        refreshList(selectedOption);
        handleClose();
      })
      .catch((error) => {
        throw error;
      });
  };

  const refreshList = (selectedOption, searchWord) => {
    axios
      .get(
        `http://localhost:8080/posts/questions/?selectedOption=${selectedOption}&searchWord=${searchWord}`
      )
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
    refreshList(selectedOption);
  }, []);

  return (
    <>
      <h2 className="mt-4" style={{"text-align" : "center"}}>1:1 문의</h2>
      <div className="content-title">
        <div id="select-search-bar">
          <select
            className="form-control"
            id="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="unsolved">미해결</option>
            <option value="solved">해결</option>
          </select>
          <span id="search-bar">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="회원 이름으로 검색하세요."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearch}
                >
                  검색
                </button>
              </div>
            </div>
          </span>
        </div>
      </div>
      <table className="table" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>문의번호</th>
            <th>ID</th>
            <th>이름</th>
            <th>제목</th>
            <th>등록일</th>
            <th>진행상태</th>
            <th>답변달기</th>
          </tr>
        </thead>
        <tbody>
          {userQuestionArr.map((info, i) => (
            <tr key={i}>
              <th>{questionIdArr[i]}</th>
              <td>{info.userUniqueId}</td>
              <td>{info.userName}</td>
              <td
                className="question-title"
                onClick={() => {
                  handleQuestionDetail(questionIdArr[i], info);
                }}
              >
                {info.postTitle}
              </td>
              <td>{info.regDate}</td>

              {!info.comment && (
                <>
                  <td>처리중</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        handleReply(questionIdArr[i], info);
                      }}
                    >
                      답변입력
                    </button>
                  </td>
                </>
              )}
              {info.comment && (
                <>
                  <td>답변완료</td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm" disabled>
                      답변완료
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationItem />

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
                <div className="question" style={{ height: "400px" }}>
                  <Writer contents={selectedQuestionContents} isNew={false} />
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">답변</span>
                    </div>
                    {isWritingAnswer && (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedQuestionComment}
                          onChange={(e) =>
                            setSelectedQuestionComment(e.target.value)
                          }
                          style={{ height: "120px" }}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              handleSaveAnswer(questionId);
                            }}
                          >
                            답변저장
                          </button>
                        </div>
                      </>
                    )}
                    {!isWritingAnswer && (
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={selectedQuestionComment}
                        style={{ height: "120px" }}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Enquiry;
