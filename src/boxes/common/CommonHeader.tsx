import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Logo, SearchBar } from '../../items';
import './CommonPage.css'


const CommonHeader = () => {
  const [loginedAccount, setLoginedAccount] = useState(false);

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

          {!loginedAccount &&
            <div id="common-header-links">
              <button onClick={() => setLoginedAccount(!loginedAccount)}>임시버튼</button>
              <Link to="/account/login">
                <span className="btn-link btn-sm">로그인</span>
              </Link>
              <Link to="/account/term-n-condition">
                <span className="btn-link btn-sm">회원가입</span>
              </Link>
            </div>
          }

          {loginedAccount &&
            <div id="common-header-links">
              <button onClick={() => setLoginedAccount(!loginedAccount)}>임시버튼</button>
              <Link to="/account/login">
                <span className="btn-link btn-sm">로그아웃</span>
              </Link>
              <Link to="/mypage">
                <span className="btn-link btn-sm">마이페이지</span>
              </Link>
            </div>
          }

        </div>

      </div>
    </div >
  );
}

export default CommonHeader;