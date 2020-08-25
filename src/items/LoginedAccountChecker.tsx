import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginedAccountChecker.css';

const LoginedAccountChecker = ({ loginedAccount, clickLogout, isAdmin }) => {
  const history = useHistory();

  const handleLogout = () => {
    alert("로그아웃 되었습니다. 다시 로그인하세요.");
    clickLogout();
    sessionStorage.clear();
    history.push("/")
  }

  return (
    <>
      {!loginedAccount &&
        <>
          <Link to="/account/login">
            <span className="btn-link btn-sm">로그인</span>
          </Link>
          <Link to="/account/term-n-condition">
            <span className="btn-link btn-sm">회원가입</span>
          </Link>
        </>
      }

      {loginedAccount &&
        <>
          <span className="btn-link btn-sm" id="logout-btn" onClick={handleLogout}>
            로그아웃
            </span>
          <Link to="/mypage">
            <span className="btn-link btn-sm">내 정보</span>
          </Link>
          {isAdmin &&
            <Link to="/admin">
              <span className="btn-link btn-sm">관리자화면</span>
            </Link>
          }
        </>
      }
    </>
  );
};

export default LoginedAccountChecker;