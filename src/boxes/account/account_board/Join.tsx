import React, { useState } from 'react';
import { PostcodeButton } from '../../../items';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Join = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [optionalAddress, setOptionalAddress] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  const handleIdCheck = e => {
    e.preventDefault();
    axios.get(`http://localhost:8080/users/idCheck/${userId}`)
      .then(() => {
        alert("이미 존재하는 아이디 입니다.");
        setUserId("");
      }).catch(() => {
        alert("사용한 가능한 아이디 입니다.");
      })
  }

  const handlePasswordCorrection = () => {
    if (password !== confirmedPassword) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    alert('회원가입 버튼 클릭')
    const userJson = {
      userId: userId,
      password: password,
      birthDate: birthDate,
      name: name,
      gender: gender,
      defaultAddr: defaultAddress,
      optionalAddr: optionalAddress,
      email: email
    }
    if (handlePasswordCorrection()) {
      axios.post(`http://localhost:8080/users/`, userJson)
        .then(() => {
          history.push('/account/login');
        }
        ).catch(
          error => { throw (error) }
        );
    } else {
      alert(`비밀번호를 확인하세요.`);
    }


  }


  return (
    <div className="container account_join">
      <form>
        <div className="form-group">
          <p>아이디</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              required
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-outline-secondary"
                onClick={handleIdCheck}
              >
                중복체크
              </button>
            </div>
          </div>
          <p>비밀번호</p>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p>비밀번호 확인</p>
          <input
            type="password"
            className="form-control"
            required
            value={confirmedPassword}
            onChange={e => setConfirmedPassword(e.target.value)}
          />
          <p>이름</p>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <p>생년월일</p>
          <input
            type="date"
            className="form-control"
            required
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
          <p>성별</p>
          <div className="input-group">
            <select
              className="custom-select"
              required
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <option value="">선택</option>
              <option value="F">여자</option>
              <option value="M">남자</option>
            </select>
          </div>
          <p>거주지 주소(필수)</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              required
              value={defaultAddress}
              onChange={e => setDefaultAddress(e.target.value)}
            />
            <div className="input-group-append">
              <PostcodeButton onPostcodeSelected={setDefaultAddress} />
            </div>
          </div>

          <p>주소 추가(선택)</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={optionalAddress}
              onChange={e => setOptionalAddress(e.target.value)}
            />
            <div className="input-group-append">
              <PostcodeButton onPostcodeSelected={setOptionalAddress} />
            </div>
          </div>
          <p>이메일</p>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-success btn-block mb-2"
        onClick={handleSubmit}
      >
        가입하기
      </button>
    </div>
  );
};

export default Join;