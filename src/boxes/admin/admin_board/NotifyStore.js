import React, { useState,useEffect } from 'react';
import './NotifyStore.css'
import { Table } from 'react-bootstrap'
import { PaginationItem } from "../../../items";
import {Link} from 'react-router-dom'
import axios from 'axios';


const NotifyStore = () => {
  const[reportList,setReportList] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = reportList.slice(indexOfFirstPost,indexOfLastPost);


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

  useEffect(()=>{
    axios
    .get(`http://localhost:8080/admins/report/list`)
    .then((res)=>{
      console.log(res.data.report)
      setReportList(res.data.report)
    })
    .catch((err)=>{
      throw err;
    })
  },[])

  const reportinitial = id=>{
    console.log(id)
    axios.get(`http://localhost:8080/admins/store/report/initialization/${id}`)
    .then((res)=>{
        window.location.reload()
    })
    .catch((err)=>{
      throw err;
    })
  }



  return (
    <div>
      
      <div className="input-group">
        <input type="text" className="form-control" placeholder="가맹점 번호/이름 검색" />
        <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              검색
            </button>
        </div>
      </div>
      
     
      <div>
      <Table responsive className="notifyStore-table">
  <thead>   
    <tr>
      <th>no</th>
      <th>가맹점 이름</th>
      <th>주 소</th>
      <th>업 종</th>
      <th>번 호</th>
      <th>가맹점 표시 해제</th>
    </tr>
  </thead>
  <tbody>
    
    {currentPosts.map((info,i)=>(
           <tr key = {i}>
           <td>{i+(indexOfFirstPost+1)}</td>
            <td><Link to={`/admin/store-detail/${info.id}`}>{info.storeName}</Link></td>
           <td>{info.address}</td>
          <td>{info.mainCode}</td>
           <th>{info.storePhone}</th>
           <td><button onClick={()=>reportinitial(info.id)}>가맹점 표시 해제</button></td>
           
           </tr>
    ))}
   
  </tbody>
</Table>
      </div>
      <div>
      <PaginationItem postPerPage={postPerPage} TotalPostList={reportList.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
      </div>
    </div>
  );
};

export default NotifyStore;