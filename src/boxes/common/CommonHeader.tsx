import React from 'react';
import { useHistory } from 'react-router-dom';
import { Logo, SearchBar, LoginedAccountChecker } from '../../items';
import './CommonPage.css'


const CommonHeader = ({loginedAccount, clickLogout, isAdmin}) => {

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

        <div className="col-lg-8 align-middle" id="common-header-search-bar">
          < SearchBar onSearch={handleSearch} />
        </div>

        <div className="col-lg-2 align-middle common-header-links">
          <LoginedAccountChecker
            clickLogout={clickLogout}
            loginedAccount={loginedAccount}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div >
  );
}

export default CommonHeader;