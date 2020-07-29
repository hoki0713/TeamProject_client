import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';

export const loginRequestAction = data => ({type: POST_LOGIN_REQUEST, payload: data});

export const postLoginRequest = data => dispatch => {
  axios.post(`http://localhost:8080/users/login`, data)
    .then(response => {
      dispatch(loginRequestAction(response.data))
      sessionStorage.setItem("userId", response.data.userId);
    }).catch(error => { throw(error) });
};

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLoginButton = e => {
    e.preventDefault();
    dispatch(postLoginRequest({userId: userId, password: password}));
    alert(`${userId}님 안녕하세요.`);
    history.push("/mypage");
  }

  return (
    <div className="container account_login">
      <form >
        <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            id="userId" 
            placeholder="아이디"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div>
            <label><input type="checkbox" /> 자동로그인</label>
            <span id="login-link"><Link to="/">아이디/비밀번호 찾기</Link></span>
          </div>
        </div>
      </form>
      <button 
        type="submit" 
        className="btn btn-success" 
        id="login-button"
        onClick={handleLoginButton}
      >
        로그인
      </button>
      <div>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/account/term-n-condition" className="btn btn-primary" id="login-button">회원가입</Link>
      </div>
    </div>
  );
};

export default Login;