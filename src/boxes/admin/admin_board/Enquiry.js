import React, { useState, useEffect } from "react";
import { PaginationItem } from "../../../items";
import "./AdminBoard.css";
import axios from "axios";

const Enquiry = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [questionIdArr, setQuestionIdArr] = useState([]);
  const [userQuestionArr, setUserQuestionArr] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    refreshList(selectedOption, searchWord);
    setSearchWord("");
  };

  const handleQuestionDetail = () => {};
  const handleReply = () => {};

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
      <div className="content-title">
        <h2 className="menu-h2"> - 1:1 문의</h2>
        <div id="select-search-bar">
          <select 
            className="form-control" 
            id="select" 
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
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
              <td>
                {!info.comment && "처리중"}
                {info.comment && "답변완료"}
              </td>
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
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationItem />
    </>
  );
};

export default Enquiry;
