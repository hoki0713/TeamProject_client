import React from 'react';
import {Button, Table, Form, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const EnquiryDetail = () => {
    return (
        <>
            <div className="userlist-content-title">
                <h2 className="userlist-menu-h2"> - 1:1문의 디테일</h2>
                <Link to="/admin/enquiry"></Link>
                <Button variant="light">목록</Button>
            </div>
            <Table responsive bordered>
                <thead>
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
                <thead>
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
            <div>
                <Button variant="light">댓글 수정</Button>{' '}
                <Button variant="light">댓글 삭제</Button>{' '}

            </div>
                    <br/>
            <Form.Row>
                    <Form.Label>댓글</Form.Label>
                <Col>
                    <Form.Control as="textarea" rows={3}/>
                </Col>

                <Button variant="light">입력</Button>{' '}

            </Form.Row>
        </>
    );
};

export default EnquiryDetail;