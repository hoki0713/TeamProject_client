import React from 'react';
import { LoginLink, SignUpLink, MenuIcon } from '../../items'

const MainNav = ({loginedAccount, clickLogout}) => {
  return (
    <div className="container">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <LoginLink
            clickLogout={clickLogout}
            loginedAccount={loginedAccount}
          />
        </li>
        <li className="nav-item">
          <SignUpLink loginedAccount={loginedAccount}/>
        </li>
        <li className="nav-item">
          <MenuIcon />
        </li>
      </ul>
    </div>

  );
}

export default MainNav;