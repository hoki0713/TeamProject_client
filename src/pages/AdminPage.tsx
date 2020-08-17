import React, {useState, useEffect} from 'react';
import { AdminHeader, AdminMenuBar, AdminContainer } from '../boxes';

const AdminPage = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'));

  const refreshUser = (id) => {
    if (id) {
      setIsLogined(true);
      if(accountDetail.adminKey) setIsAdmin(true);
    } else {
      setIsLogined(false);
    }
  }

  useEffect(() => {
    refreshUser(accountDetail.id);
  }, [accountDetail])
  return (
    <div>
      <AdminHeader
        clickLogout={refreshUser}
        loginedAccount={isLogined}
        isAdmin={isAdmin}
      />
      <AdminMenuBar />
      <AdminContainer match />
    </div>
  );
};

export default AdminPage;