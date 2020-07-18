import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './AdminPage.css';


const AdminMenuBar = () => {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [isThirdOpen, setIsThirdOpen] = useState(false);
  const [isFouthOpen, setIsFouthOpen] = useState(false);

  const firstToggleOpen = () => {
    setIsFirstOpen(!isFirstOpen);
    setIsSecondOpen(false);
    setIsThirdOpen(false);
    setIsFouthOpen(false);
  };
  const secondToggleOpen = () => {
    setIsFirstOpen(false);
    setIsSecondOpen(!isSecondOpen);
    setIsThirdOpen(false);
    setIsFouthOpen(false);
  };
  const thirdToggleOpen = () => {
    setIsFirstOpen(false);
    setIsSecondOpen(false);
    setIsThirdOpen(!isThirdOpen);
    setIsFouthOpen(false);
  };
  const fourthToggleOpen = () => {
    setIsFirstOpen(false);
    setIsSecondOpen(false);
    setIsThirdOpen(false);
    setIsFouthOpen(!isFouthOpen);
  };

  const firstMenuOpen = `dropdown-menu${isFirstOpen ? " show" : ""}`;
  const secondMenuOpen = `dropdown-menu${isSecondOpen ? " show" : ""}`;
  const thirdMenuOpen = `dropdown-menu${isThirdOpen ? " show" : ""}`;
  const fourthMenuOpen = `dropdown-menu${isFouthOpen ? " show" : ""}`;
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav" id="admin-menu-bar">
          <li className="nav-item dropdown admin-menu-bar-item">
            <p
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              onClick={firstToggleOpen}
            >
              통계
            </p>
            <div
              className={firstMenuOpen}
              onClick={() => setIsFirstOpen(false)}
            >
              <Link to="/find-by-map">
                <p className="dropdown-item">회원수 증감 조회</p>
              </Link>
              <Link to="/merchant-list">
                <p className="dropdown-item">추천가맹점 조회수</p>
              </Link>
              <Link to="/find-best-route">
                <p className="dropdown-item">사용자 이용 지역</p>
              </Link>
              <p className="dropdown-item">지역화폐 매출</p>
            </div>
          </li>

          <li className="nav-item dropdown admin-menu-bar-item">
            <p
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              onClick={secondToggleOpen}
            >
              관리
            </p>
            <div
              className={secondMenuOpen}
              onClick={() => setIsSecondOpen(false)}
            >
              <Link to="/recommendation">
                <p className="dropdown-item">회원목록</p>
              </Link>
              <Link to="/find-by-tag">
                <p className="dropdown-item">공지사항</p>
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown admin-menu-bar-item">
            <p
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              onClick={thirdToggleOpen}
            >
              민원처리
            </p>
            <div
              className={thirdMenuOpen}
              onClick={() => setIsThirdOpen(false)}
            >
              <Link to="/notice">
                <p className="dropdown-item">지역화폐 미사용 신고 외</p>
              </Link>
                <p className="dropdown-item">1:1문의</p>
            </div>
          </li>

        
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenuBar;
