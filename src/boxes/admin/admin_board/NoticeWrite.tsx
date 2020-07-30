import React,{ useState } from 'react';
import {Form, Col, Button, Row} from 'react-bootstrap'
import {Link} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './AdminBoard.css'

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
            <div className="content-title">
                <h2 className="menu-h2"> - 공지사항 작성</h2>
            </div>
            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm={1}>
                        카테고리
                    </Form.Label>
                    <Col sm={2}>
                        <Form.Control as="select" >
                            <option>지역화폐</option>
                            <option>사이트</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={1} style={{textAlign : 'center'}}>
                        제목
                    </Form.Label>
                    <Col>
                        <Form.Control as="input"/>
                    </Col>
                </Form.Group>
                <ReactQuill theme="snow"
                            value={value} onChange={setValue}
                            modules={modules}
                            formats={formats}
                            style={{height:'400px'}}
                />
               {/* <Form.Label>첨부 링크</Form.Label>
                <Form.Control as="input"/>
                <Form.File label="파일 첨부"/>*/}
            </Form>
            <br/>
            <div id="quill-button-center">
                <Link to="/admin/notice">
                    <Button variant="primary" type="submit">확인</Button>{' '}
                    <Button variant="secondary" type="button">취소</Button>{' '}
                </Link>
            </div>

        </>
    );
};

export default NoticeWrite;