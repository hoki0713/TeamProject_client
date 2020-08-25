import React from 'react';
import {Button, Modal} from 'react-bootstrap'
import PaymentIamPort from "./PaymentIamPort.js";

const Payment = (props) => {



    return (

        <Modal {...props} style={{textAlign : 'center'}}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title>지역화폐 결제하기</Modal.Title>
            <Modal.Body>
                {props.localName}의 지역화폐 {props.unitPrice}원을 구매하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
                <PaymentIamPort unitPrice={props.unitPrice} localName={props.localName}/>
                <Button variant="secondary" onClick={props.onHide}>취소</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Payment;