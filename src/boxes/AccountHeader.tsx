import React from 'react';
import { Logo } from '../items';

import './AccountPage.css';

const AccountHeader = () => {
  return (
    <div className="container" id="account-page-logo">
      <Logo />
    </div>
  );
};

export default AccountHeader;