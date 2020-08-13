import React from 'react';
import {Button} from "react-bootstrap";

function PaymentIamPort() {
    function onClickPayment() {
        /* 1. 가맹점 식별하기 */
        const { IMP } :any= window;
        IMP.init('imp15100680');

        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: 'kakao',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            amount: 1000,                                 // 결제금액
            name: '지역화폐 기프티콘 구매',                  // 주문명
            buyer_name: '홍길동',                           // 구매자 이름
            buyer_tel : '010',

        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
        const {
            success,
            merchant_uid,
            error_msg,
        } = response;

        if (success) {
            let msg = '결제가 완료되었습니다.'
            msg += response.name
            msg += response.buyer_name
            msg += response.paid_amount
            alert('결제 성공');
            alert(msg)
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }

    return (
<>
    <Button onClick={onClickPayment}>결제하기</Button>
</>
);
}
export default PaymentIamPort;