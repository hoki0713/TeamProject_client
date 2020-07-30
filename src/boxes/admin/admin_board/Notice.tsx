import React, {useState} from 'react';
import {Button, Table, Container, Row, Col} from 'react-bootstrap';
import {PaginationItem, SearchBar} from "../../../items";
import {Link} from "react-router-dom";
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import './AdminBoard.css'

const POST_LIST = "POST_LIST"
export const postListAction = data => ({
    type: POST_LIST,
    payload: data
})

export const postListReducer = (state = [], action) => {
    switch (action.type) {
        case POST_LIST :
            return action.payload
        default :
            return state
    }
}


const initialState = {
    input: '',
    posts: [
        {
            postNo: 1,
            category: '사이트',
            title: '사이트 임시 점검 예정',
            writer: '관리자',
            regDate: '2020/07/29',
            readCount: 55,
            file: 'O'
        },
        {
            postNo: 2,
            category: '지역화폐',
            title: '김포페이 서비스 연장 안내',
            writer: '김포시',
            regDate: '2020/07/31',
            readCount: 82,
            file: 'X'
        }
    ]
}
/*export const postListThunk = ()=>dispatch=>{
    console.log('api 도착')
    axios.get()
}*/
const Notice = () => {

    const [post, setPost] = useState({})
    const [postList, setPostList] = useState([])
    const resultList = useSelector((x: any) => x.postListReducer)
    const dispatch = useDispatch()


    const handleSearch = (searchWord) => {
        alert(searchWord);
    }

    return (
        <>
            <div className="content-title">
                <h2 className="menu-h2"> - 공지사항</h2>
                <div id="select-search-bar">
                    <select id="select" className="form-control">
                        <option selected>선택</option>
                        <option>제목</option>
                        <option>내용</option>
                        <option>제목 및 내용</option>
                    </select>
                    <select className="form-control" id="select">
                        <option selected>카테고리</option>
                        <option>지역</option>
                        <option>사이트</option>
                    </select>
                    <span id="search-bar">
          <SearchBar onSearch={handleSearch}/>
                    </span>
                </div>
            </div>


            <div>
                <Table responsive bordered hover style={{textAlign:"center"}}>
                    <thead >
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                        <th>조회수</th>
                        <th>파일</th>
                    </tr>
                    </thead>
                    <tbody >
                    {initialState.posts.map((posts, i) => (
                        <tr key={i}>
                            <td >{posts.postNo}</td>
                            <td> {posts.category}</td>
                            <td>{posts.title}</td>
                            <td>{posts.writer}</td>
                            <td>{posts.regDate}</td>
                            <td>{posts.readCount}</td>
                            <td>{posts.file}</td>
                        </tr>))}

                    </tbody>
                </Table>

                <Container fluid>
                    <Row noGutters>
                        <Col sm={11}> <PaginationItem/></Col>
                        <Col> <Link to="/admin/notice-write">
                            <Button variant="primary" id="button-right">글쓰기</Button>
                        </Link></Col>
                    </Row>

                </Container>

            </div>


        </>
    );
}

export default Notice;