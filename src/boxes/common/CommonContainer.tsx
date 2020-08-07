import React from 'react';
import { Route } from 'react-router-dom';
import { MerchantList, FindByMap, FindBestRoute, Recommendation, FindByTag, Notice, BuyLocalCurrency } from './board';
import MerchanDetail from "./board/map/MerchanDetail";
import Maptest2 from "./board/map/Maptest2";


const CommonContainer = () => {

  return (
    <div className='container'>
      <Route path="/merchant-list">
        <MerchantList />
      </Route>
      <Route path="/find-by-map">
        <FindByMap />
      </Route>
      <Route path="/find-best-route">
        <FindBestRoute />
      </Route>
      <Route path="/recommendation">
        <Recommendation />
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
        <MerchanDetail/>
      </Route>
        <Route path={'/maptest'}>
            <Maptest2/>
        </Route>
    </div>
  );
}

export default CommonContainer;