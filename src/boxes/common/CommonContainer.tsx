import React from 'react';
import { Route } from 'react-router-dom';

import {MerchanDetail,FindByMap,MerchantList,FindBestRoute, Recommendation, FindByTag, Notice, BuyLocalCurrency} from './board';

const CommonContainer = ({ isLogined }) => {

    return (
        <div className='container'>
            <Route path="/merchant-list">
                <MerchantList />
            </Route>
            <Route path="/find-by-map">
                <FindByMap isLogined={isLogined} />
            </Route>
            <Route path="/find-best-route">
                <FindBestRoute />
            </Route>

            <Route path="/recommendation">
                <Recommendation/>
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
                <MerchanDetail isLogined={isLogined}/>
            </Route>

        </div>
    );
}

export default CommonContainer;
