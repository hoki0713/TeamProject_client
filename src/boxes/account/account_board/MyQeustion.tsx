import React from 'react';

const MyQeustion = () => {
  const handleEdit = e => {
    e.preventDefault();
  }

  const handleDelete = e => {
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
    </div>
  );
};

export default MyQeustion;