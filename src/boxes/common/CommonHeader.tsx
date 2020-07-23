import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Logo, SearchBar } from '../../items';
import './CommonPage.css'


const CommonHeader = () => {
  const history = useHistory();
  const handleSearch = (searchWord) => {
    alert(searchWord);
    history.push('/merchant-list');
  }

  return (
    <div className="container">
      <div className="row">

        <div className="col-lg-2">
          <div id="common-header-logo">
            <Logo />
          </div>
        </div>

        <div className="col-lg-8" id="common-header-search-bar">
          < SearchBar onSearch={handleSearch} />
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