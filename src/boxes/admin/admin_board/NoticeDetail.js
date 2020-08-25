import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NoticeDetail.css";
import axios from "axios";

const NoticeDetail = ({ match }) => {
  const history = useHistory();
  const [post, setPost] = useState({});
  const [isOpen, setOpen] = useState(false);
  const ReactQuill =
    isOpen && typeof window === "object" ? require("react-quill") : () => false;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/post/${match.params.postId}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    setOpen(true);
  }, []);

  const noticeList = () => {
    window.location.href = "/admin/notice";
  };

  const deleteNotice = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8080/posts/delete/${match.params.postId}`)
      .then(() => {
        window.location.href = "/admin/notice";
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <h2 className="menu-h2">공지사항</h2>

      <div id="contents-wrapper">
        <div id="contents-header">
          <div className="contents-header-items">
            <div id="contents-header-category">
              <span className="contents-header-items-title">카테고리 :</span>
              {post.category}
            </div>
            <div id="contents-header-write-date">
              <span className="contents-header-items-title">작성일 :</span>
              {post.regDate}
            </div>
          </div>
          <div className="contents-header-items">
            <span className="contents-header-items-title">제목 :</span>
            {post.postTitle}
          </div>
        </div>

        {ReactQuill && isOpen && (
          <div id="contents-main">
            <ReactQuill
              value={post.contents || ""}
              bounds={".app"}
              theme="snow"
              readOnly
              style={{ height: "350px" }}
            />
          </div>
        )}

        <div id="contents-footer">
          <button
            className="btn btn-outline-primary notice-buttons"
            onClick={() => {
              history.push(`/admin/notice-modify/${post.postId}`);
            }}
          >
            수정
          </button>
          <button
            className="btn btn-outline-danger notice-buttons"
            onClick={deleteNotice}
          >
            삭제
          </button>
          <button
            className="btn btn-outline-secondary notice-buttons"
            onClick={noticeList}
          >
            목록
          </button>
        </div>
      </div>
    </>
  );
};

export default NoticeDetail;
