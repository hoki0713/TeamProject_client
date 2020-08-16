import React,{useState, useEffect} from 'react';
import PaginationItem from '../items/index'
import axios from 'axios'
import Notice from '../boxes/admin/admin_board/index'
import {Link} from 'react-router-dom'

const PaginationTotal = ({info,index}) =>{

  const [postList, setPostList] = useState([]);

  useEffect(()=>{
    axios
    .get('http://localhost:8080/posts/postlist')
    .then((res)=>{
         setPostList(res.data)
    
    })
    .catch((err)=>{
    throw err;
    })
  },[])

  
  const getNotice = postId =>{
    console.log(postId)
    axios
        .get(`http://localhost:8080/posts/post/${postId}`)
        .then((res)=>{
                sessionStorage.setItem("notice",JSON.stringify(res.data))
                window.location.href="/admin/notice-detail"
        })
        .catch((err)=>{
            throw err;
        })
}



  return(
    <>
      <PaginationItem postPerPage={5} postList={postList} 
      Test = {
        <tr key={index}>
        <td >{1}</td>
        <td> {info.category}</td>
       <td> <Link onClick={()=>getNotice(info.postId)}>{info.postTitle}</Link></td>
     {info.category==="사이트" && <td>관리자</td>} 
    { info.category==="지역화폐" && <td>경기지역화폐</td> }
        <td>{info.regDate}</td>
    </tr>
      } />
    </>
  )
}

export default PaginationTotal;