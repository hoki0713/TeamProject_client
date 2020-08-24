import React, {useState, useEffect} from 'react';
import { AdminHeader, AdminMenuBar, AdminContainer } from '../boxes';
import { LoginLink } from '../items'
import {useHistory} from 'react-router-dom'


const AdminPage = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || '{}'));
  const history = useHistory();

  const refreshUser = (id) => {
    if (id) {
      setIsLogined(true);
      if(accountDetail.adminKey) setIsAdmin(true);
    } else {
      setIsLogined(false);
    }
  }

  const moveToLoginPage = () =>{
      history.push("/account/login")
  }

  useEffect(() => {
    refreshUser(accountDetail.id);
  }, [accountDetail])
  return (
    <div>
   { isAdmin &&
    <div>
      <AdminHeader
        clickLogout={refreshUser}
        loginedAccount={isLogined}
        isAdmin={isAdmin}
      />
      <AdminMenuBar />
      <AdminContainer match />
    </div>}

    {!isAdmin &&
       moveToLoginPage()
        }
    </div>
  );
};

export default AdminPage;