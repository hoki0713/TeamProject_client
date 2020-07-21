import React from 'react';

const Join = () => {
  return (
    <div className="container account_join">
      <form>
        <div className="form-group">
          <p>아이디</p>
          <div className="input-group">
            <input type="text" className="form-control" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">중복체크</button>
            </div>
          </div>
          <p>비밀번호</p>
          <input type="password" className="form-control" />
          <p>비밀번호 확인</p>
          <input type="password" className="form-control" />
          <p>이름</p>
          <input type="text" className="form-control" />
          <p>생년월일</p>
          <input type="text" pattern="[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}" className="form-control" />
          <p>성별</p>
          <div className="input-group">
            <select className="custom-select">
              <option selected>선택</option>
              <option value="F">여자</option>
              <option value="M">남자</option>
            </select>
          </div>
          <p>거주지 주소(필수)</p>
          <div className="input-group">
            <input type="text" className="form-control" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">우편번호검색</button>
            </div>
          </div>
          <input type="text" className="form-control" />
          <p>주소 추가(선택)</p>
          <div className="input-group">
            <input type="text" className="form-control" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">우편번호검색</button>
            </div>
          </div>
          <input type="text" className="form-control" />
          <p>이메일</p>
          <div className="input-group">
            <input type="email" className="form-control" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">인증번호 전송</button>
            </div>
          </div>
          <input type="text" className="form-control" placeholder="인증번호를 입력하세요."/>
        </div>
      </form>
      <button type="submit" className="btn btn-success btn-block mb-1">가입하기</button>
    </div>
  );
};

export default Join;