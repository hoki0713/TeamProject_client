import * as React from 'react';

import { LoginLink, SignUpLink, MenuIcon, ChatbotIcon } from '../../items'

function MainNav() {
  return (
    <div className="container">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <LoginLink />
        </li>
        <li className="nav-item">
          <SignUpLink />
        </li>
        <li className="nav-item">
          <MenuIcon />
        </li>
        <li className="nav-item">
          <ChatbotIcon />
        </li>
      </ul>
    </div>

  );
}

export default MainNav;