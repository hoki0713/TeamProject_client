import React from 'react';
import { Route } from 'react-router-dom';
import { Login } from './board';

import './AccountPage.css';

const AccountContainer = () => {
  return (
    <div className="container" id="account-page-width">
      <Route path="/account/login">
        <Login />
      </Route>
      <Route path="/account/term-n-condition">

      </Route>
    </div>
  );
};

export default AccountContainer;