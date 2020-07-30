import React from 'react';
import { Route } from 'react-router-dom';
import { Login, TermAndCondition, Join, FindId, FindPassword, AccountDetail, PurchaseHistory } from './account_board';

import './AccountPage.css';

const AccountContainer = () => {
  return (
    <div className="container" id="account-page-width">
      <Route path="/account/login">
        <Login />
      </Route>
      <Route path="/account/term-n-condition">
        <TermAndCondition />
      </Route>
      <Route path="/account/join">
        <Join />
      </Route>
      <Route path="/account/find-id">
        <FindId />
      </Route>
      <Route path="/account/find-password">
        <FindPassword />
      </Route>
    </div>
  );
};

export default AccountContainer;