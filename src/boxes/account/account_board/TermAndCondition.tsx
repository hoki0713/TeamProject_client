import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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

  const history = useHistory();

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

  const handleNextJoinPage = () => {
    if (checkAll) {
      history.push("/account/join");
    } else {
      alert("필수 약관에 모두 동의하지 않았습니다.");
    }
  };

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

        <button type="submit" className="btn btn-primary" id="term-n-condition-confirm-button" onClick={handleNextJoinPage}>
          확인
          </button>

      </div>
    </div>
  );
};
const termOfService = `여러분을 환영합니다.
모범시민 지역화폐 가맹점 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 모범시민 지역화폐 가맹점 서비스의 이용과 관련하여 모범시민 지역화폐 가맹점 서비스를 제공하는 모범시민 지역화폐 가맹점 주식회사(이하 ‘모범시민 지역화폐 가맹점’)와 이를 이용하는 모범시민 지역화폐 가맹점 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 모범시민 지역화폐 가맹점 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
모범시민 지역화폐 가맹점 서비스를 이용하시거나 모범시민 지역화폐 가맹점 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
다양한 모범시민 지역화폐 가맹점 서비스를 즐겨보세요.
모범시민 지역화폐 가맹점을 비롯한 모범시민 지역화폐 가맹점 도메인의 웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공, 상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다.`;

const privacyPolicy = `개인정보보호법에 따라 모범시민 지역화폐 가맹점에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.

1. 수집하는 개인정보
이용자는 회원가입을 하지 않아도 정보 검색, 뉴스 보기 등 대부분의 모범시민 지역화폐 가맹점 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 모범시민 지역화폐 가맹점는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.

회원가입 시점에 모범시민 지역화폐 가맹점가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
- 회원 가입 시에 ‘아이디, 비밀번호, 이름, 생년월일, 성별, 휴대전화번호’를 필수항목으로 수집합니다. 만약 이용자가 입력하는 생년월일이 만14세 미만 아동일 경우에는 법정대리인 정보(법정대리인의 이름, 생년월일, 성별, 중복가입확인정보(DI), 휴대전화번호)를 추가로 수집합니다. 그리고 선택항목으로 이메일 주소, 프로필 정보를 수집합니다.
- 단체아이디로 회원가입 시 단체아이디, 비밀번호, 단체이름, 이메일주소, 휴대전화번호를 필수항목으로 수집합니다. 그리고 단체 대표자명을 선택항목으로 수집합니다.
서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
NAVER 내의 개별 서비스 이용, 이벤트 응모 및 경품 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.

서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다. 또한 이미지 및 음성을 이용한 검색 서비스 등에서 이미지나 음성이 수집될 수 있습니다.
구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여 이를 저장(수집)하거나,
2) 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못 하도록 안전하게 변환하여 수집합니다. 서비스 이용 과정에서 위치정보가 수집될 수 있으며,
모범시민 지역화폐 가맹점에서 제공하는 위치기반 서비스에 대해서는 '모범시민 지역화폐 가맹점 위치정보 이용약관'에서 자세하게 규정하고 있습니다.`;

const userLocation = `위치정보 이용약관에 동의하시면, 위치를 활용한 광고 정보 수신 등을 포함하는 모범시민 지역화폐 가맹점 위치기반 서비스를 이용할 수 있습니다.


제 1 조 (목적)
이 약관은 모범시민 지역화폐 가맹점 주식회사 (이하 “회사”)가 제공하는 위치정보사업 또는 위치기반서비스사업과 관련하여 회사와 개인위치정보주체와의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2 조 (약관 외 준칙)
이 약관에 명시되지 않은 사항은 위치정보의 보호 및 이용 등에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 전기통신기본법, 전기통신사업법 등 관계법령과 회사의 이용약관 및 개인정보처리방침, 회사가 별도로 정한 지침 등에 의합니다.`;


TermAndCondition.defaultProps = {
  termOfService: termOfService,
  privacyPolicy: privacyPolicy,
  userLocation: userLocation
}

export default TermAndCondition;