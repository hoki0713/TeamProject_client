import React, { useEffect, useState } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import { PaginationItem, SearchBar } from "../../../items";
import { Link } from "react-router-dom";
import axios from 'axios';
import './AdminBoard.css';


const POST_LIST = "POST_LIST";

export const postListAction = (data) => ({
  type: POST_LIST,
  payload: data,
});

export const postListReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIST:
      return {...state,payload:action.payload};
    default:
      return state;
  }
};


export const postListThunk = () => (dispatch) => {
  
  axios
    .get(`http://localhost:8080/posts/postlist`)
    .then((res) => {
       
      dispatch(postListAction(res.data));
    
    })
    .catch((err) => {
      throw err;
    });
};

export const postOneThunk = (postId) => (dispatch) => {
  
            axios
            .get(`http://localhost:8080/posts/post/${postId}`)
            .then((res)=>{
               dispatch(postListAction(res.data))
            
               console.log(res.data)
                 
            })
            .catch((err)=>{
                throw err;
            })
  };


const Notice = () => {

    const [postList, setPostList] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage] = useState(5);


    
   

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = postList.slice(indexOfFirstPost,indexOfLastPost);
 

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () =>{ 
        if(currentPage<currentPosts.length){
            setCurrentPage(currentPage+1)} 
            else if(postPerPage<currentPosts.length){
                setCurrentPage(currentPage+1)
            } else{
                setCurrentPage(currentPage)
            }
        }
           
    const prevPage = () => { 
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
       };

  
    useEffect(() => {
        axios
        .get('http://localhost:8080/posts/postlist')
        .then((res)=>{
             setPostList(res.data)
        
        })
        .catch((err)=>{
        throw err;
        })
    }, [])

    const handleSearch = (searchWord) => {
        alert(searchWord);
    }


    return (
        <>
            <div className="content-title">
                <h2 className="menu-h2"> - 공지사항</h2>
                <div id="select-search-bar">
                    <select id="select" className="form-control">
                        <option value="">선택</option>
                        <option>제목</option>
                        <option>내용</option>
                        <option>제목 및 내용</option>
                    </select>
                    <select className="form-control" id="select">
                        <option value="">카테고리</option>
                        <option>지역</option>
                        <option>사이트</option>
                    </select>
                    <span id="search-bar">
                        <SearchBar placeholder={"김포"} onSearch={handleSearch} />
                    </span>
                </div>
            </div>
         
      


            <div>
                <Table responsive hover style={{ textAlign: "center" }}>
                    <thead >
                        <tr>
                            <th>번호</th>
                            <th>구분</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody >
                        {currentPosts.map((info, i) => (
                            <tr key={i}>
                                <td >{i+(indexOfFirstPost+1)}</td>
                                <td> {info.category}</td>
                               <td> <Link to={`/admin/notice-detail/${info.postId}`}>{info.postTitle}</Link></td>
                             {info.category==="사이트" && <td>관리자</td>} 
                            { info.category==="지역화폐" && <td>경기지역화폐</td> }
                                <td>{info.regDate}</td>
                            </tr>))}
                    </tbody>
                </Table>
              

                <Container fluid>
                    <Row noGutters>
                    
                        <Col> <Link to="/admin/notice-write">
                            <Button variant="primary" id="button-right">글쓰기</Button>
                        </Link></Col>
                    </Row>    
                </Container>
                <div>
               <PaginationItem postPerPage={postPerPage} TotalPostList={postList.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
               
  </div>
            </div>


        </>
    );
}

export default Notice;
