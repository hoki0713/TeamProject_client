import React from 'react';
import { Route } from 'react-router-dom';
import {MerchanDetail,FindByMap,MerchantList,FindBestRoute, Recommendation, FindByTag, NoticeList, BuyLocalCurrency,NoticeDetailClient} from './board';
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
                <NoticeList />
            </Route>
            <Route path={"/notice-detail/:postId"}
            render={(props)=><NoticeDetailClient {...props}/>}
            >
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