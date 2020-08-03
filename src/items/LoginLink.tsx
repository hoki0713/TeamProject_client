import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = ({ loginedAccount }) => {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
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