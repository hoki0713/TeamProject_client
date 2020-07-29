import React,{ useState } from 'react';
import {Form, Col, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const NoticeWrite = () => {
    const [value, setValue] = useState('');


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }], [{ 'font': [] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],[{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image'],

            ['clean'],

        ],
    }

       const formats = [
            'header', 'font',
            'bold', 'italic', 'underline', 'strike', 'blockquote','align',
           'color', 'background',
           'list', 'bullet',
            'link', 'image',
        ]

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
                <ReactQuill theme="snow"
                            value={value} onChange={setValue}
                            modules={modules}
                            formats={formats}
                />
               {/* <Form.Label>첨부 링크</Form.Label>
                <Form.Control as="input"/>
                <Form.File label="파일 첨부"/>*/}
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