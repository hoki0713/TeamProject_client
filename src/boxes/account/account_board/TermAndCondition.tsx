import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type termAndConditionProps = {
  termOfService: string;
  privacyPolicy: string;
  userLocation: string;
}

const TermAndCondition = ({ termOfService, privacyPolicy, userLocation }: termAndConditionProps) => {
  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  function handleCheckAll() {
    setCheckAll(!checkAll);
    setCheck1(!checkAll);
    setCheck2(!checkAll);
    setCheck3(!checkAll);
  }

  function handleCheck1() {
    setCheck1(!check1);
    if (!check1 && check2 && check3) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }

  function handleCheck2() {
    setCheck2(!check2);
    if (check1 && !check2 && check3) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }

  function handleCheck3() {
    setCheck3(!check3);
    if (check1 && check2 && !check3) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }

  return (
    <div className="container">
      <form>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" checked={checkAll} onChange={handleCheckAll} />
          <label>전체동의</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="termOfService" checked={check1} onChange={handleCheck1} />
          <label>이용약관 동의 (필수)</label>
        </div>
        <textarea className="form-control" value={termOfService} readOnly />
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="privacyPolicy" checked={check2} onChange={handleCheck2} />
          <label>개인정보 수집 및 이용에 대한 안내 (필수)</label>
        </div>
        <textarea className="form-control" value={privacyPolicy} readOnly />
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="userLocation" checked={check3} onChange={handleCheck3} />
          <label>위치정보 이용약관 동의 (필수)</label>
        </div>
        <textarea className="form-control" value={userLocation} readOnly />
      </form>
      <div>
        <Link to="/" className="btn btn-danger" id="term-n-condition-cancel-button">취소</Link>
        <Link to="/account/join">
          <button type="submit" className="btn btn-primary" id="term-n-condition-confirm-button">
            확인
          </button>
        </Link>
      </div>
    </div>
  );
};

TermAndCondition.defaultProps = {
  termOfService: "이용약관내용",
  privacyPolicy: "개인정보 수집 및 이용에 대한 안내",
  userLocation: "위치정보 이용약관 동의"
}

export default TermAndCondition;