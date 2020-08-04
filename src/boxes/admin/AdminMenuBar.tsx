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
  

  const firstMenuOpen = `dropdown-menu${isFirstOpen ? " show" : ""}`;
  const secondMenuOpen = `dropdown-menu${isSecondOpen ? " show" : ""}`;
  const thirdMenuOpen = `dropdown-menu${isThirdOpen ? " show" : ""}`;
 
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <span className="navbar-admin-span text-white ">관리자</span>
        <ul className="navbar-nav" id="admin-menu-bar">
          <li className="nav-item dropdown admin-menu-bar-item">
            <p
              className="nav-link dropdown-toggle text-white "
              data-toggle="dropdown"
              onClick={firstToggleOpen}
            >
              통계
            </p>
            <div
              className={firstMenuOpen}
              onClick={() => setIsFirstOpen(false)}
            >
              <Link to="/admin/user-statistic">
                <p className="dropdown-item">회원 통계</p>
              </Link>
              <Link to="/admin/local-user">
                <p className="dropdown-item">사용자 이용 지역</p>
              </Link>
              <Link to ="/admin/currency-amount">
              <p className="dropdown-item">지역화폐 매출</p>
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown admin-menu-bar-item">
            <p
              className="nav-link dropdown-toggle text-white"
              data-toggle="dropdown"
              onClick={secondToggleOpen}
            >
              관리
            </p>
            <div
              className={secondMenuOpen}
              onClick={() => setIsSecondOpen(false)}
            >
              <Link to="/admin/users-list">
                <p className="dropdown-item">회원목록</p>
              </Link>
              <Link to="/admin/notice">
                <p className="dropdown-item">공지사항</p>
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown admin-menu-bar-item">
            <p
              className="nav-link dropdown-toggle text-white"
              data-toggle="dropdown"
              onClick={thirdToggleOpen}
            >
              민원처리
            </p>
            <div
              className={thirdMenuOpen}
              onClick={() => setIsThirdOpen(false)}
            >
              <Link to="/admin/notify-sotre">
                <p className="dropdown-item">지역화폐 미사용 신고/가맹점 리스트</p>
              </Link>
              <Link to="/admin/enquiry">
                <p className="dropdown-item">1:1문의</p>
                </Link>
            </div>
          </li>

        
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenuBar;
