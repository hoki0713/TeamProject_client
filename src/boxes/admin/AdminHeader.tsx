import React from "react";
import { Link } from 'react-router-dom';
import { Logo, LoginedAccountChecker } from '../../items';
import './AdminPage.css';

const AdminHeader = ({ loginedAccount, clickLogout, isAdmin }) => {
  return (
    <div className="container">
      <div className="row">

        <div className="col-lg-2">
          <div id="admin-header-logo">
            <Logo />
          </div>
        </div>
        <div className="col-lg-6"></div>
        <div className="col-lg-4 admin-header-menus">
          <div id="admin-header-links">
            <LoginedAccountChecker
              clickLogout={clickLogout}
              loginedAccount={loginedAccount}
              isAdmin={isAdmin}
            />
            <Link to="/merchant-list">
              <span className="btn-link btn-sm">사용자화면</span>
            </Link>
          </div>

        </div>
      </div>
    </div>

  );
};

export default AdminHeader;
