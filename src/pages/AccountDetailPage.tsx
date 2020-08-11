import React, { useState, useEffect } from 'react';
import { AccountNavBar, AccountDetailContainer } from '../boxes/account';
import { CommonHeader } from '../boxes';

const AccountDetailPage = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'));

  useEffect(() => {
    if (accountDetail) {
      setIsLogined(true);
      if(accountDetail.adminKey) setIsAdmin(true);
    } else {
      setIsLogined(false);
    }
  }, [accountDetail])

  return (
    <div className="container">
      <CommonHeader 
        loginedAccount={isLogined} 
        isAdmin={isAdmin}
      />
      <AccountNavBar />
      <AccountDetailContainer />
    </div>
  );
};

export default AccountDetailPage;