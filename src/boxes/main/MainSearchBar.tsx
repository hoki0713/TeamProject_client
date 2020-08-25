import React from 'react';
import './MainPage.css';
import { StoreSearchBar } from '../../items';

const MainSeachBar = () => {

  return (
    <div className="container" id="main-search-bar" >
      <div>※현재 의정부 가맹점만 서비스합니다.</div>
      < StoreSearchBar />
    </div>
  );
}

export default MainSeachBar;