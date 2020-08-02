import React from 'react';
import { Link } from 'react-router-dom';

const AccountNavBar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav" id="common-menu-bar">
          <li className="nav-item common-menu-bar-item">
            <Link to="/mypage" className="nav-link">
              내 정보 수정
            </Link>
          </li>

          <li className="nav-item common-menu-bar-item">
            <Link to="/mypage/purchase-history" className="nav-link">
              구매내역
            </Link>
          </li>

          <li className="nav-item common-menu-bar-item">
            <Link to="/mypage/my-review" className="nav-link">
              내 리뷰
            </Link>
          </li>

          <li className="nav-item common-menu-bar-item">
            <Link to="/mypage/my-favorite" className="nav-link">
              즐겨찾기
            </Link>
          </li>

          <li className="nav-item common-menu-bar-item">
            <Link to="/mypage/my-question" className="nav-link">
              1:1 문의
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AccountNavBar;