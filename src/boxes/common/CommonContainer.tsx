import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { MerchanDetail, FindByMap, MerchantList, FindBestRoute, Recommendation, FindByTag, Notice, BuyLocalCurrency } from './board';


const CommonContainer = ({ isLogined }) => {

    const [storeInfo, setStoreInfo] = useState({});

    return (
        <div className='container'>
            <Route path="/merchant-list">
                <MerchantList />
            </Route>
            <Route path="/find-by-map">
                <FindByMap isLogined={isLogined} setStoreInfo={setStoreInfo} storeInfo={storeInfo}/>
            </Route>
            <Route path="/find-best-route">
                <FindBestRoute setStoreInfo={setStoreInfo} storeInfo={storeInfo}/>
            </Route>

            <Route path="/recommendation">
                <Recommendation setStoreInfo={setStoreInfo} />
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
                <MerchanDetail storeInfo={storeInfo} isLogined={isLogined}/>
            </Route>

        </div>
    );
}

export default CommonContainer;