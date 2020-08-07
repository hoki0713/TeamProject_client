import React from 'react';
import { Link } from 'react-router-dom';

const SignUpLink = ({ loginedAccount }) => {
  return (
    <>
      {!loginedAccount &&
        <Link to="/account/term-n-condition" className="nav-link">
          회원가입
        </Link>
      }
      {loginedAccount &&
        <Link to="/mypage" className="nav-link">
          내 정보
        </Link>
      }
    </>
  );
};

export default SignUpLink;