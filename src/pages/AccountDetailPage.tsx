import React, { useState, useEffect } from 'react';
import { AccountNavBar, AccountDetailContainer } from '../boxes/account';
import { CommonHeader } from '../boxes';

const AccountDetailPage = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'));

  const refreshUser = (id) => {
    if (id) {
      setIsLogined(true);
      if (accountDetail.adminKey) setIsAdmin(true);
    } else {
      setIsLogined(false);
    }
  }

  useEffect(() => {
    refreshUser(accountDetail.id);
  }, [accountDetail])

  return (
    <>
      <CommonHeader
        clickLogout={refreshUser}
        loginedAccount={isLogined}
        isAdmin={isAdmin}
      />
      <AccountNavBar />
      <AccountDetailContainer />
    </>
  );
};

export default AccountDetailPage;