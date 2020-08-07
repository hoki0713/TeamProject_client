import React from 'react';
import { Link } from 'react-router-dom';

const LoginedAccountChecker = ({loginedAccount}) => {
  const handleLogout = () => {
    alert("로그아웃 되었습니다. 다시 로그인하세요.");
    sessionStorage.clear();
  }

  return (
    <div>
      {!loginedAccount &&
            <div id="common-header-links">
              <Link to="/account/login">
                <span className="btn-link btn-sm">로그인</span>
              </Link>
              <Link to="/account/term-n-condition">
                <span className="btn-link btn-sm">회원가입</span>
              </Link>
            </div>
          }

          {loginedAccount &&
            <div id="common-header-links">
              <Link to="/account/login">
                <span className="btn-link btn-sm" onClick={handleLogout}>
                  로그아웃  
                </span>
              </Link>
              <Link to="/mypage">
                <span className="btn-link btn-sm">내 정보</span>
              </Link>
            </div>
          }
    </div>
  );
};

export default LoginedAccountChecker;