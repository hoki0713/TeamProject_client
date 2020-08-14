import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = ({ loginedAccount, clickLogout }) => {
  const handleLogout = () => {
    alert("로그아웃 되었습니다. 다시 로그인 하세요.")
    sessionStorage.clear();
    clickLogout();
  }

  return (
    <>
      {!loginedAccount &&
        <Link to="/account/login" className="nav-link">
          로그인
        </Link>
      }
      {loginedAccount &&
        <Link to="/" className="nav-link" onClick={handleLogout}>
          로그아웃
        </Link>
      }
    </>
  );
};

export default LoginLink;