import React from 'react';
// import { useHistory } from 'react-router-dom';
import './MainPage.css';
import { StoreSearchBar } from '../../items';

const MainSeachBar = () => {
  // const { setStore } = useContext(StoreSearchContext);
  // const history = useHistory();

  // const searchMerchant = (store) => {
  //   setStore(store);
  //   history.push('/storeDetail');
  // }

  return (
    <div className="container" id="main-search-bar" >
      <div>※현재 의정부 가맹점만 서비스합니다.</div>
      < StoreSearchBar />
    </div>
  );
}

export default MainSeachBar;