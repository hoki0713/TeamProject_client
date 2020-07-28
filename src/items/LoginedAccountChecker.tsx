import React from 'react';
import { Link } from 'react-router-dom';

const LoginedAccountChecker = ( {loginedAccount, onClick}) => {
  //() => setLoginedAccount(!loginedAccount)
  return (
    <div>
      {!loginedAccount &&
            <div id="common-header-links">
              <button onClick={onClick}>임시버튼</button>
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
              <button onClick={onClick}>임시버튼</button>
              <Link to="/account/login">
                <span className="btn-link btn-sm">로그아웃</span>
              </Link>
              <Link to="/mypage">
                <span className="btn-link btn-sm">마이페이지</span>
              </Link>
            </div>
          }
    </div>
  );
};

export default LoginedAccountChecker;