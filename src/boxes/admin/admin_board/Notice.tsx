import React, {useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import {PaginationItem, SearchBar} from "../../../items";
import {Link} from "react-router-dom";
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";

const POST_LIST = "POST_LIST"
export const postListAction = data =>({
    type:POST_LIST,
    payload : data
})

export const postListReducer = (state=[],action)=>{
    switch (action.type){
        case POST_LIST : return action.payload
        default : return state
    }
}


const initialState = {
    input:'',
    posts:[
        {
          postNo : 1,
          category : '사이트',
          title : '사이트 임시 점검 예정',
          regDate : '2020/07/29',
          readCount : 55,
          link : 'O'
        },
        {
            postNo : 2,
            category : '지역화폐',
            title : '김포페이 서비스 연장 안내',
            regDate : '2020/07/31',
            readCount : 82,
            link : 'X'
        }
    ]
}
/*export const postListThunk = ()=>dispatch=>{
    console.log('api 도착')
    axios.get()
}*/
const Notice = () => {

    const [post, setPost] = useState({})
    const [postList, setPostList] =useState([])
    const resultList = useSelector((x:any)=>x.postListReducer)
    const dispatch = useDispatch()



    const handleSearch = (searchWord) => {
        alert(searchWord);
    }

    return (
        <>
            <div className="userlist-content-title">
                <h2 className="userlist-menu-h2"> - 공지사항</h2>
                <div id="userlist-select-search-bar">
                    <select className="form-control" id="userlist-select">
                        <option selected>선택</option>
                        <option>제목</option>
                        <option>내용</option>
                        <option>제목 및 내용</option>
                    </select>
                    <select className="form-control" id="userlist-select">
                        <option selected>구분</option>
                        <option>지역</option>
                        <option>사이트</option>
                    </select>
                    <span id="userlist-search-bar">
          <SearchBar onSearch={handleSearch}/>
        </span>
                </div>
            </div>



            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>제목</th>
                        <th>등록일</th>
                        <th>조회수</th>
                        <th>링크</th>
                    </tr>
                    </thead>
                    <tbody>
                    {initialState.posts.map((posts,i)=>(
                        <tr key={i}>
                            <td>{posts.postNo}</td>
                            <td> {posts.category}</td>
                            <td>{posts.title}</td>
                            <td>{posts.regDate}</td>
                            <td>{posts.readCount}</td>
                            <td>{posts.link}</td>
                        </tr>))}

                    </tbody>
                </Table>
                <PaginationItem/>
                <Link to="/admin/notice-write">
                <Button variant="primary">글쓰기</Button>
                </Link>
            </div>




        </>
    );
}

export default Notice;