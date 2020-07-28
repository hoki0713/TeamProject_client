import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Logo, SearchBar, LoginedAccountChecker } from '../../items';
import './CommonPage.css'


const CommonHeader = () => {
  const [loginedAccount, setLoginedAccount] = useState(false);

  const setLogin = e => {
    e.preventDefault();
    setLoginedAccount(!loginedAccount);
  }

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
          <LoginedAccountChecker loginedAccount={loginedAccount} onClick={setLogin}/>
        </div>
      </div>
    </div >
  );
}

export default CommonHeader;