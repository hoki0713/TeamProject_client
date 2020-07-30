import React from 'react';
import { Route } from 'react-router-dom';
import { AccountDetail, PurchaseHistory, MyReview, MyFavorites } from  './account_board';

const AccountDetailContainer = () => {
  return (
    <div className="container">
      <Route path="/mypage" exact>
        <AccountDetail />
      </Route>
      <Route path="/mypage/purchase-history">
        <PurchaseHistory />
      </Route>
      <Route path="/mypage/my-review">
        <MyReview />
      </Route>
      <Route path="/mypage/my-favorite">
        <MyFavorites />
      </Route>
    </div>
  );
};

export default AccountDetailContainer;