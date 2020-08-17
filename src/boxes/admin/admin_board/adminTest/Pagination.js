import React, { useState, useEffect } from "react";

const Pagination = ({ paginate, totalPages, currentPage }) => {
  const [currentBlock, setCurrentBlock] = useState(0);


  const prevPage = () => {
    if (currentPage === 0) {
      alert("첫 번째 페이지 입니다.");
    } else {
      paginate(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage === totalPages) {
      alert("마지막 페이지 입니다.");
    } else {
      paginate(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentBlock(Math.floor(currentPage / 5));
  }, [currentPage]);

  return (
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <span
          onClick={() => {
            prevPage();
            window.scrollTo(0, 0);
          }}
          className="page-link"
        >
          Previous
        </span>
      </li>

      {[...Array(5).keys()]
        .map((num) => num + currentBlock * 5)
        .filter(num => num <= totalPages)
        .map((number) => (
          <li key={number} className="page-item">
            <span
              onClick={() => {
                paginate(number);
                window.scrollTo(0, 0);
              }}
              className="page-link page-btn"
            >
              {number + 1}
            </span>
          </li>
        ))}

      <li className="page-item">
        <span
          onClick={() => {
            nextPage();
            window.scrollTo(0, 0);
          }}
          className="page-link"
        >
          Next
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
