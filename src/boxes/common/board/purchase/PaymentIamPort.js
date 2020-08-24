import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import axios from 'axios'

const PaymentIamPort = (props) => {
    const [accountDetail] = useState(JSON.parse(sessionStorage.getItem("accountDetail") || `{}`));
    const [id, setId] = useState("");

    useEffect(() => {
        setId(accountDetail.id)
    }, [accountDetail]);


    const onClickPayment = (props) => {
        /* 1. 가맹점 식별하기 */
        const {IMP} = window;
        IMP.init('imp15100680');

        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: 'kakao',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            amount: props.unitPrice,                            // 결제금액
            name: `${props.localName} 지역화폐 구매`,               // 주문명
            buyer_name: accountDetail.name                          // 구매자 이름
        };
        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(res) {
        const {
            success,
            merchant_uid,
            error_msg,
        } = res;

        if (success) {
            axios.post(`http://localhost:8080/sales/create-sales/${id}`,
                {
                    unitPrice: res.paid_amount,
                    paymentName: res.pay_method,
                    localName: props.localName
                })
                .then((res) => {
                    window.location.href = "/mypage/purchase-history/notice";
                })
                .catch((err) => {
                    throw err;
                });
            let msg = `${res.name} ${res.paid_amount}원 결제가 완료되었습니다.`
            alert(msg)

        } else {
            alert(`결제 실패: ${error_msg}`);


        }
    }

    return (
        <>
            <Button onClick={() => onClickPayment(props)}>결제하기</Button>
        </>
    );
}
export default PaymentIamPort;