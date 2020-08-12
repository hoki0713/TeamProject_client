import React from 'react';
import {Button, Modal} from 'react-bootstrap'
import PaymentIamPort from "./PaymentIamPort";


const Payment = (props) => {



    return (

        <Modal {...props}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title>결제하기</Modal.Title>
            <Modal.Body>

               <PaymentIamPort/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>취소</Button>
                <Button variant="outline-primary" onClick={props.onHide}>결제하기</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Payment;