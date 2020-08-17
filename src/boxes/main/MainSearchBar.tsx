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
      < StoreSearchBar />
    </div>
  );
}

export default MainSeachBar;