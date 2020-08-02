import React, {useState} from 'react';
import './purchase.css'
import { Link } from 'react-router-dom';
import PurchaseMap from "./PurchaseMap";


export const CurrencyImg =()=> {
    const [imgsrc]=useState("https://t1.daumcdn.net/cfile/tistory/994CBF355E7EE0570A")
    return(<img className="currency_img" src={imgsrc}/>)

}


function BuyLocalCurrency() {
    const payment=()=>{window.open('/account/login','window_name','width=700,height=800,location=center,status=no,scrollbars=yes')}

    return (

        <div className="currency">
            <table className="currency_table">
                <tr><td><h3>지역사랑화폐</h3></td><td></td><td></td></tr>
                <tr><td><CurrencyImg/><br/><input type="checkbox"/><h5>5,000원</h5></td><td><CurrencyImg/><br/><input type="checkbox"/><h5>10,000원</h5></td><td rowSpan={2}><PurchaseMap/></td></tr>
                <tr><td><CurrencyImg/><br/><input type="checkbox"/><h5>15,000원</h5></td><td></td><td></td></tr>
                <tr><td></td><td><br/><button type="button" className="btn btn-primary" onClick={payment}>결제하기</button></td>
                    <td><br/><Link to='/find-by-map'><Link to='/find-by-map'><button type="button" className="btn btn-danger" >취소하기</button></Link></Link>
                    </td></tr>
            </table>
        </div>
    );
}

export default BuyLocalCurrency;