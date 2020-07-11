import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './CommonPage.css';

function CommonMenuBar() {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [isThirdOpen, setIsThirdOpen] = useState(false);
  const [isFouthOpen, setIsFouthOpen] = useState(false);

  const firstToggleOpen = () => {
    setIsFirstOpen(!isFirstOpen)
    setIsSecondOpen(false)
    setIsThirdOpen(false)
    setIsFouthOpen(false)
  };
  const secondToggleOpen = () => {
    setIsFirstOpen(false)
    setIsSecondOpen(!isSecondOpen)
    setIsThirdOpen(false)
    setIsFouthOpen(false)
  };
  const thirdToggleOpen = () => {
    setIsFirstOpen(false)
    setIsSecondOpen(false)
    setIsThirdOpen(!isThirdOpen)
    setIsFouthOpen(false)
  };
  const fourthToggleOpen = () => {
    setIsFirstOpen(false)
    setIsSecondOpen(false)
    setIsThirdOpen(false)
    setIsFouthOpen(!isFouthOpen)
  };

  const firstMenuOpen = `dropdown-menu${isFirstOpen ? " show" : ""}`
  const secondMenuOpen = `dropdown-menu${isSecondOpen ? " show" : ""}`
  const thirdMenuOpen = `dropdown-menu${isThirdOpen ? " show" : ""}`
  const fourthMenuOpen = `dropdown-menu${isFouthOpen ? " show" : ""}`
  
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav" id="common-menu-bar">
          <li className="nav-item dropdown common-menu-bar-item">
            <p className="nav-link dropdown-toggle" data-toggle="dropdown" onClick={firstToggleOpen}>
              가맹점 찾기
            </p>
            <div className={firstMenuOpen}>
              <Link to="/">
                <p className="dropdown-item">
                  지도에서 찾아보기
                </p>
              </Link>
              <Link to="/">
                <p className="dropdown-item">
                  리스트로 찾아보기
                </p>
              </Link>
              <Link to="/">
                <p className="dropdown-item">
                  최적경로 찾아보기
                </p>
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown common-menu-bar-item">
            <p className="nav-link dropdown-toggle" data-toggle="dropdown" onClick={secondToggleOpen} >
              맞춤추천
            </p>
            <div className={secondMenuOpen}>
              <Link to="/">
                <p className="dropdown-item">
                  추천가맹점 보기
                </p>
              </Link>
              <Link to="/">
                <p className="dropdown-item">
                  태그로 검색하기
                </p>
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown common-menu-bar-item">
            <p className="nav-link dropdown-toggle" data-toggle="dropdown" onClick={thirdToggleOpen}>
              공지사항
            </p>
            <div className={thirdMenuOpen}>
              <Link to="/">
                <p className="dropdown-item">
                  공지사항
                </p>
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown common-menu-bar-item">
            <p className="nav-link dropdown-toggle" data-toggle="dropdown" onClick={fourthToggleOpen} >
              지역화폐
            </p>
            <div className={fourthMenuOpen}>
              <Link to="/">
                <p className="dropdown-item">
                  지역화폐 구매하기
                </p>
              </Link>
            </div>
          </li>

        </ul>

      </nav>
    </div>
  );
}

export default CommonMenuBar;