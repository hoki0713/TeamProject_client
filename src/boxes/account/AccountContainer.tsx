import React from 'react';
import { Route } from 'react-router-dom';
import { Login, TermAndCondition, Join } from './account_board';

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
    </div>
  );
};

export default AccountContainer;