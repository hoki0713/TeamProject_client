import React,{useState,useEffect} from 'react';
import {SearchBar} from "../../../items";
import {Link} from 'react-router-dom'
import {Table,Button} from 'react-bootstrap'
import './AdminBoard.css'
import axios from 'axios';
const NoticeDetail = () => {
    const [postId,setPostId] = useState({});

   const [notice] = useState(
       JSON.parse(sessionStorage.getItem("notice"))
   )

   useEffect(()=>{
      
       console.log(JSON.parse(sessionStorage.getItem("notice")))
       setPostId(notice.postId)
   },[notice])

   const modifyNotice = () =>{
       window.location.href="/admin/notice-modify"
   }

    return (
        <>
            <div className="content-title">
                <h2 className="menu-h2"> - 공지사항</h2>
            </div>
            <Table responsive bordered>
                <thead style={{textAlign:'center'}}>
                <tr>
                    <th>카테고리 - {notice.category}</th>
                    <th>제목 - {notice.postTitle}</th>
                    <th>작성일 - {notice.regDate}</th>
                    
                </tr>
                </thead>
                <tbody>
                <tr>
                 <td colSpan={4}> {notice.contents}</td>

                </tr>
                {/* <tr>
                    <td>파일 다운로드</td>
                    <td colSpan={3}>김포시.hwp</td>
                </tr> */}

                </tbody>
            </Table>
            <div id="button-right">
            <Button variant="outline-dark" onClick={modifyNotice}>수정</Button>{' '}
            <Button variant="outline-dark">삭제</Button>{' '}
            <Button variant="outline-dark"><Link to="/admin/notice">목록</Link></Button>
            </div>
            </>
    );
};

export default NoticeDetail;