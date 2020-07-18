import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainSeachBar() {

  return (
    <div className="container" id="main-search-bar">
      <div className="input-group">
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

  );
}

export default MainSeachBar;