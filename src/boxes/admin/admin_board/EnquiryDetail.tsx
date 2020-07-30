import React from 'react';
import {Button, Table, Form, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import './AdminBoard.css'
const EnquiryDetail = () => {
    return (
        <>
            <div className="content-title">
                <h2 className="menu-h2"> - 1:1문의 디테일</h2>
                <div id="button-right">
                <Link to="/admin/enquiry">
                <Button variant="outline-dark">목록</Button>
                </Link>
                </div>
            </div>
            <Table responsive bordered>
                <thead style={{textAlign:"center"}}>
                <tr>
                    <th>어플은 없습니까?</th>
                    <th>turtle</th>
                    <th>turtle@bitcamp.com</th>
                    <th>해결</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={4}>
                        잘 쓰고 있어요. <br/>어플은 안 하세요?
                    </td>
                </tr>
                </tbody>
            </Table>
            <Table bordered responsive>
                <thead style={{textAlign:"center"}}>
                <tr>
                    <td>
                        관리자 댓글
                    </td>
                    <td>
                        작성일시
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={2}>웹만 서비스 중입니다. 관심 감사합니다.</td>
                </tr>
                </tbody>

            </Table>
            <div id="button-right">
                <Button variant="outline-dark">댓글 수정</Button>{' '}
                <Button variant="outline-dark">댓글 삭제</Button>{' '}

            </div>
                    <br/><br/><br/>
            <Form>
                <Form.Group as={Row} >
                    <Col sm={1} style={{textAlign:'center'}}>
                    <Form.Label >
                        댓글
                    </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control as="textarea" rows={3}/>
                    </Col>
                    <Button variant="outline-dark">입력</Button>{' '}
                </Form.Group>
            </Form>
        </>
    );
};

export default EnquiryDetail;