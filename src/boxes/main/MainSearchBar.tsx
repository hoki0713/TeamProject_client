import React from 'react';
import { useHistory } from 'react-router-dom';
import './MainPage.css';
import { SearchBar } from '../../items';

const MainSeachBar = () => {
  const history = useHistory();

  const searchMerchant = (searchWord) => {
    history.push('/merchant-list');
  }

  return (
    <div className="container" id="main-search-bar" >
      < SearchBar onSearch={searchMerchant}/>
    </div>
  );
}

export default MainSeachBar;