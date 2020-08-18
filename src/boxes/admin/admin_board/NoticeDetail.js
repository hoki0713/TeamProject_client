import React,{useState,useEffect} from 'react';
import {Table,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './AdminBoard.css'
import axios from 'axios';
import ReactQuill from "react-quill";




const NoticeDetail = ({match}) => {
    
    
    const [post,setPost] = useState({});
    const [isOpen, setOpen] = useState(false);
    const ReactQuill = isOpen && typeof window === 'object' ? require('react-quill') : () => false;
   
   useEffect(()=>{
    axios
        .get(`http://localhost:8080/posts/post/${match.params.postId}`)
        .then((res)=>{
                 setPost(res.data)
                
        })
        .catch((err)=>{
            throw err;
        })
   },[])

   useEffect(() => {
    setOpen(true);
  }, []);

   const modifyNotice = () =>{
       window.location.href="/admin/notice-modify"
   }

   const noticeList = () =>{
       window.location.href="/admin/notice"
   }

   const deleteNotice = e =>{
        e.preventDefault()
       
        axios
        .delete(`http://localhost:8080/posts/delete/${match.params.postId}`)
        .then((res)=>{
            window.location.href="/admin/notice"
        })
        .catch((err)=>{
            throw err;
        })
   }

    return (
        <>
            <div className="content-title">
    <h2 className="menu-h2"> - 공지사항</h2>
            </div>
            <Table responsive bordered>
                <thead style={{textAlign:'center'}}>
                <tr>
                    <th>카테고리 - {post.postTitle}</th>
                    <th>제목 - {post.postTitle}</th>
                    <th>작성일 - {post.regDate}</th>
                    
                </tr>
                </thead>
                <tbody>
                <tr>
                <td colSpan={4}>
                    
                    
                {/* <ReactQuill
                    theme="snow"
                    value={post.contents}
                    readOnly
                 style={{ height: "350px" }}
                /> */}
            {!!ReactQuill && isOpen && <ReactQuill
            value={post.contents || ''}
            bounds={'.app'}
            theme="snow"
            readOnly
            style={{ height: "350px" }}
             />}
      </td>
                 
                </tr>
            

                </tbody>
            </Table>
            <div id="button-right">
            <Link to={`/admin/notice-modify/${post.postId}`}><Button variant="outline-dark">수정</Button></Link>
            <Button variant="outline-dark" onClick={deleteNotice}>삭제</Button>
            <Button variant="outline-dark " onClick={noticeList}>목록</Button>
            </div>
            </>
    );
};

export default NoticeDetail;