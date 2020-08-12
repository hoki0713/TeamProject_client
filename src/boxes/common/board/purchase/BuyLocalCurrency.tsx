import React, {useState} from 'react';
import './purchase.css'
import {Link} from 'react-router-dom';
import PurchaseMap from "./PurchaseMap";
import Payment from "./Payment";


export const CurrencyImg = ({imgsrc}) => {

    return (<img className="currency_img" src={imgsrc}/>)

}


function BuyLocalCurrency() {

    const [modalShow, setModalShow] = useState(false);
    const [imgsrc, setImgsrc] = useState("https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/eejungbu_didptv.png")
    const payment = () => {
        setModalShow(true)
    }
    return (

        <div className="currency">
            <Payment show={modalShow} onHide={() => setModalShow(false)}/>
            <table className="currency_table">
                <tr>
                    <td><h3>지역사랑화폐</h3></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><CurrencyImg imgsrc={imgsrc}/><br/><input type="checkbox"/><h5>5,000원</h5></td>
                    <td><CurrencyImg imgsrc={imgsrc}/><br/><input type="checkbox"/><h5>10,000원</h5></td>
                    <td rowSpan={2}><PurchaseMap setImgsrc={setImgsrc}/></td>
                </tr>
                <tr>
                    <td><CurrencyImg imgsrc={imgsrc}/><br/><input type="checkbox"/><h5>15,000원</h5></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td><br/>
                        <button type="button" className="btn btn-primary" onClick={payment}>결제하기</button>
                    </td>
                    <td><br/><Link to='/find-by-map'><Link to='/find-by-map'>
                        <button type="button" className="btn btn-danger">취소하기</button>
                    </Link></Link>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default BuyLocalCurrency;