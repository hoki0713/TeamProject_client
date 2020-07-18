import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../items';
import './CommonPage.css'


function CommonHeader() {

  return (
    <div className="container">
      <div className="row">

        <div className="col-lg-2">
          <div id="common-header-logo">
            <Logo />
          </div>
        </div>

        <div className="col-lg-8">
          <div className="input-group" id="common-header-search-bar">
            <input type="text" className="form-control" placeholder="Search" />
            <div className="input-group-append">
              <Link to="/merchant-list">
                <button className="btn btn-primary" type="button">
                  검색
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <div id="common-header-links">
            <Link to="/account/login">
              <span className="btn-link btn-sm">로그인</span>
            </Link>
            <Link to="/account/term-n-condition">
              <span className="btn-link btn-sm">회원가입</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CommonHeader;