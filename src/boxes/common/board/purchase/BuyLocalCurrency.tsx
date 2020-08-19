import React, {useState} from 'react';
import './purchase.css'
import {Link} from 'react-router-dom';
import PurchaseMap from "./PurchaseMap";
import Payment from "./Payment";
import PaymentIamPort from "./PaymentIamPort";


export const CurrencyImg = ({imgsrc}) => {
    return (<img className="currency_img" src={imgsrc}/>)
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
            <div className="content-title">
                <h2>경기지역화폐 구매하기</h2>
                <div>지역화폐를 구매, 선물할 수 있습니다.<br/>
                원하는 지역과 금액을 선택해주세요.
                </div>
                <Payment show={modalShow} localName={localName} unitPrice={unitPrice}
                         onHide={() => setModalShow(false)}/>
                <table className="currency_table">
                    <tr>
                        <td><CurrencyImg imgsrc={imgsrc}/><br/><input type="radio" name={"checkbox"} value={5000}
                                                                      onChange={handleUnitPrice}/><h5>5,000원</h5></td>
                        <td><CurrencyImg imgsrc={imgsrc}/><br/><input type="radio" name={"checkbox"} value={10000}
                                                                      onChange={handleUnitPrice}/><h5>10,000원</h5></td>
                        <td><CurrencyImg imgsrc={imgsrc}/><br/><input type="radio" name={"checkbox"} value={15000}
                                                                      onChange={handleUnitPrice}/><h5>15,000원</h5></td>
                        <td><PurchaseMap setImgsrc={setImgsrc} setLocalName={setLocalName}/></td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <br/>
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