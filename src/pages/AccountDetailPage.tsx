import React, { useState, useEffect } from 'react';
import { AccountNavBar, AccountDetailContainer } from '../boxes/account';
import { CommonHeader } from '../boxes';

const AccountDetailPage = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [accountDetail] = useState(sessionStorage.getItem("accountDetail"));

  useEffect(() => {
    if (accountDetail) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [accountDetail])

  return (
    <div className="container">
      <CommonHeader loginedAccount={isLogined} />
      <AccountNavBar />
      <AccountDetailContainer />
    </div>
  );
};

export default AccountDetailPage;