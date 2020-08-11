import React,{ useState } from 'react';
import {Form, Col, Button, Row} from 'react-bootstrap'
import {Link} from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './AdminBoard.css'
import axios from 'axios'

const NoticeWrite = () => {
    const [contents, setContents] = useState('');
    const [postTitle,setPostTitle] = useState('');
    const [category,setCategort] = useState('');

const newNotice = e =>{
    e.preventDefault()
    alert(`확인`)
    const notice = {
        category:category,
        postTitle:postTitle,
        contents:contents
    }
    axios
    .get(`http://localhost:8080/posts/notice/create`,notice)
    .then((res)=>{
            console.log(res.data)
    })
    .catch((err)=>{
        throw err;
    })

    
}


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
                        <Form.Control as="select"
                        value={category}
                        onChange={e=>setCategort(e.target.value)} >
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
                        <Form.Control onChange={e=>setPostTitle(e.target.value)} value={postTitle} as="input"/>
                    </Col>
                </Form.Group>
                <ReactQuill theme="snow"
                            value={contents} onChange={setContents}
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
                    <Button variant="primary" onClick={newNotice} type="submit">확인</Button>{' '}
                    <Button variant="secondary" type="button">취소</Button>{' '}
                </Link>
            </div>

        </>
    );
};

export default NoticeWrite;