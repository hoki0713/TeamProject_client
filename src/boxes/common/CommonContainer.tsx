import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import { MerchantList, FindBestRoute, Recommendation, FindByTag, Notice, BuyLocalCurrency, FindByMap } from './board';
import MerchanDetail from "./board/map/MerchanDetail";

const CommonContainer = ({ isLogined }) => {
    const [storeInfo,setStoreInfo]=useState({})
  return (
    <div className='container'>
      <Route path="/merchant-list">
        <MerchantList />
      </Route>

        <Route path="/find-by-map">
            <FindByMap isLogined={isLogined}/>
        </Route>
        <Route path="/find-best-route">
            <FindBestRoute />
        </Route>

      <Route path="/recommendation">
        <Recommendation setStoreInfo={setStoreInfo}/>
      </Route>
      <Route path="/find-by-tag">
        <FindByTag />
      </Route>

      <Route path="/notice">
        <Notice />
      </Route>
      <Route path="/buy-local-currency">
        <BuyLocalCurrency />
      </Route>
      <Route path="/storeDetail">
        <MerchanDetail storeInfo={storeInfo}/>
      </Route>

    </div>
  );
}

export default CommonContainer;
