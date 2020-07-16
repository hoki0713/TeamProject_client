import React from 'react';
import { Route } from 'react-router-dom';
import { Login, TermAndCondition } from './board';

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
    </div>
  );
};

export default AccountContainer;