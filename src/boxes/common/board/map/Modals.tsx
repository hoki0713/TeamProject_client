import React, { useState} from "react";
import {Button, Modal} from "react-bootstrap";








export const Star =(props)=> {
    const [store,setStore]=useState('밀양순대국밥')
    return (
        <div>

            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>가맹점 즐겨찾기 추가하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {store}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>취소</Button>
                    <Button variant="danger" onClick={props.onHide}>추가하기</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};