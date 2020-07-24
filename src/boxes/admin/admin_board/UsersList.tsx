import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import './UserList.css'




//import Pagination from 'react-bootstrap/Pagination'
export const userList = data => ({type:"USER_LIST",payload:data})

const userListReducer = (state=[],action) =>{
  switch(action.type) {
    case 'USER_LIST':return action.payload
    default: return state
  }
} 




function UsersList() {
  const [select,setSelect] = useState('select')
  const [userSearch,setUserSearch] = useState('');

  const selectCheck = e => {
      e.preventDefault()
      setSelect(e.target.value)
  }

  const search = e =>{
    e.preventDefault()
    setUserSearch(e.target.value.trim().toLowerCase())
      alert('123')
  }



  


  return (
    <>
    <div className="userlist-content-title">
      <h2 className="userlist-menu-h2"> - 회원목록</h2>
      <h6 className="userlist-menu-h6">총회원수:()</h6>
      <div id="userlist-select-search-bar">
        <select className="form-control" id="userlist-select" onChange={selectCheck} value={select}>
          <option selected value="select1" >선택</option>
          <option value="userid">아이디</option>
          <option value="username">가입자명</option>
          <option value="userlocal">거주지역</option>
        </select>
        
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" value={userSearch}/>
        <div className="input-group-append">
            <button onClick={search} className="btn btn-primary" type="button">
              검색
            </button>
        
        </div>
      </div>
    </div>
      </div>
   
    <h2>{select}</h2>



      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>가입자명</th>
              <th>생일</th>
              <th>성별</th>
              <th>거주지역</th>
              <th>이메일</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>
      </div>




    </>
  );
}

export default UsersList;