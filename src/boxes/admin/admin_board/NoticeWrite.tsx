import React from 'react';
import {Form, Col, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

const NoticeWrite = () => {
    return (
        <>
            <div className="userlist-content-title">
                <h2 className="userlist-menu-h2"> - 공지사항 작성</h2>
            </div>
            <Form>
                <Form.Row>
                    <Col sm={1.5}>
                        <Form.Label>카테고리</Form.Label>
                        <Form.Control as="select">
                            <option>지역화폐</option>
                            <option>사이트</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>제목</Form.Label>
                        <Form.Control as="input"/>
                    </Col>
                </Form.Row>
                <Form.Label>내용</Form.Label>
                <Form.Control as="textarea" rows={10}/>
                <Form.Label>첨부 링크</Form.Label>
                <Form.Control as="input"/>
                <Form.File label="파일 첨부"/>
            </Form>
            <br/>
            <div>
                <Link to="/admin/notice">
                    <Button variant="primary" type="submit">확인</Button>{' '}
                    <Button variant="secondary" type="button">취소</Button>{' '}
                </Link>
            </div>

        </>
    );
};

export default NoticeWrite;