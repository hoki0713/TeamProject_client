import React from 'react';
import { Route } from 'react-router-dom';

import { MerchantList, FindByMap, FindBestRoute, Recommendation, FindByTag, Notice, BuyLocalCurrency } from './board';



function CommonContainer() {
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

    </div>
  );
}

export default CommonContainer;