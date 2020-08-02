import React from 'react';
import { Link } from 'react-router-dom';

import './FindIdPasswordLink.css';

const FindIdPasswordLink = () => {
  return (
    <>
      <div id="link-board">
        <div id="inline-block-for-find-id">
          <Link to="/account/find-id">아이디 찾기</Link>
        </div>
        <div id="inline-block-for-find-password">
          <Link to="/account/find-password">비밀번호 찾기</Link>
        </div>
      </div>
    </>
  );
};

export default FindIdPasswordLink;