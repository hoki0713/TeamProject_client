import React from 'react';
import { Route } from 'react-router-dom';
import { AccountDetail, PurchaseHistory } from  './account_board';

const AccountDetailContainer = () => {
  return (
    <div className="container">
      <Route path="/mypage" exact>
        <AccountDetail />
      </Route>
      <Route path="/mypage/purchase-history">
        <PurchaseHistory />
      </Route>
    </div>
  );
};

export default AccountDetailContainer;