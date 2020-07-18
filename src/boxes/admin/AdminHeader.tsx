import React from "react";
import { Link } from 'react-router-dom';
import { Logo } from '../../items';
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
          
        </div>

      

        <div className="col-lg-2 admin-header-menus">
          <div id="admin-header-links">
            <Link to="/">
              <span className="btn-link btn-sm">로그아웃</span>
            </Link>
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
