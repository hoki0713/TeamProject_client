import React from "react";
import { Link } from 'react-router-dom';
import { Logo } from '../items';
import './AdminPage.css';

const AdminHeader = () => {
  return (
<div className="container">
      <div className="row">

        <div className="col-lg-2">
          <div id="admin-header-logo">
            <Logo />
          </div>
        </div>

        <div className="col-lg-8">
          <div className="input-group" id="admin-header-search-bar">
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
          <div id="admin-header-links">
            <Link to="/account/login">
              <span className="btn-link btn-sm">로그아웃</span>
            </Link>
            <Link to="/account/term-n-condition">
              <span className="btn-link btn-sm">사용자화면</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminHeader;
