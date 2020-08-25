import React, { useState } from 'react';
import './purchase.css'
import { Link } from 'react-router-dom';
import PurchaseMap from "./PurchaseMap";
import Payment from "./Payment";

export const CurrencyImg = ({ imgsrc }) => {

  return (
    <>
      <img className="currency_img" src={imgsrc} alt="지도이미지"/>
    </>
  )
}


function BuyLocalCurrency() {

  const [modalShow, setModalShow] = useState(false);
  const [imgsrc, setImgsrc] = useState("https://res.cloudinary.com/tinaland/image/upload/v1597215523/local_pay_img/gge_mwzspr.png")
  const submitPayment = () => {
    if (
      localName === "" ||
      unitPrice === 0
    ) {
      alert("지역과 금액을 모두 선택해주세요");
    } else {
      setModalShow(true)
    }
  }
  const [unitPrice, setUnitPrice] = useState(0)
  const [localName, setLocalName] = useState("")
  const handleUnitPrice = (e) => {
    setUnitPrice(e.target.value)
  }


  return (
    <>
      <h2 className="mt-4 mb-4" id="title">경기지역화폐 구매하기</h2>
      <div className="content-title">
        <Payment show={modalShow} localName={localName} unitPrice={unitPrice}
          onHide={() => setModalShow(false)} />
        <table className="currency_table" >
          <tr >
            <td colSpan={3} >
              <div><h4>지역화폐를 구매, 선물할 수 있습니다.</h4>
                1. 지도에서 원하는 지역을 선택하세요.<br/>
                2. 원하는 금액을 선택해주세요. <br/>
                3. 결제하기를 버튼을 누르고 카드로 결제하세요.<br/>
                <span style={{fontSize : "10px", "color" : "red"}}>※ 구매취소를 원하시는 경우 070-0000-0000으로 문의 부탁드립니다.</span></div>
            </td>
            <td rowSpan={2}><PurchaseMap setImgsrc={setImgsrc} setLocalName={setLocalName} /></td>
          </tr>
          <tr >
            <td><CurrencyImg imgsrc={imgsrc} /><br /><input type="radio" name={"checkbox"} value={5000}
              onChange={handleUnitPrice} /><h5>5,000원</h5></td>
            <td ><CurrencyImg imgsrc={imgsrc} /><br /><input type="radio" name={"checkbox"} value={10000}
              onChange={handleUnitPrice} /><h5>10,000원</h5></td>
            <td ><CurrencyImg imgsrc={imgsrc} /><br /><input type="radio" name={"checkbox"} value={15000}
              onChange={handleUnitPrice} /><h5>15,000원</h5></td>
          </tr>
          <tr>
            <td colSpan={4}>
              <br />
              <button type="button" className="btn btn-primary" onClick={submitPayment}>결제하기</button>
              {'  '}
              <Link to='/find-by-map'>
                <button type="button" className="btn btn-danger">취소하기</button>
              </Link></td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default BuyLocalCurrency;