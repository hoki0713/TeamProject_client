import React, {useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";



export const StoreReport=(props)=> {
    return (
        <div>

            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>가맹점 신고하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={"https://i.pinimg.com/474x/57/62/24/5762245c37514d61a333d1d5d1434670.jpg"} width={40} height={40}
                    />
                    &nbsp; 해당 가맹점에서 지역화폐를 받지 않습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>취소</Button>
                    <Button variant="danger" onClick={props.onHide}>신고하기</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};




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