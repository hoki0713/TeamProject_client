import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container">
      <form >
        <div className="form-group">
          <input type="text" className="form-control" id="userId" placeholder="아이디"/>
          <input type="password" className="form-control" id="password" placeholder="비밀번호" />
          <div>
            <label><input type="checkbox" /> 자동로그인</label>
            <span id="login-link"><Link to="/">아이디/비밀번호 찾기</Link></span>
          </div>
        </div>
      </form>
      <button type="submit" className="btn btn-success" id="login-button">로그인</button>
      <div>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/account/term-n-condition" className="btn btn-primary" id="login-button">회원가입</Link>
      </div>
    </div>
  );
};

export default Login;