import React, { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import './UserList.css'
import {SearchBar} from '../../../items';
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
//import Pagination from 'react-bootstrap/Pagination'

const USER_LIST = "USER_LIST"

export const userListAction = data => ({type:USER_LIST ,payload:data})

export const userListReducer = (state=[],action) =>{
  switch(action.type) {
    case USER_LIST :return action.payload
    default: return state
  }
} 

export const userListThunk = searchWord => dispatch =>{
  console.log("api 도착")
  axios.get(`http://localhost:8080/admins/list/${searchWord}`)
    .then(res=>{dispatch(userListAction(res.data))})
    .catch(err=>{throw(err)})
}

 const UsersList = () => {
  
   const [userSelect,setUserSelect] = useState("")
   const [user,setUser] =useState({})
   const [lists,setLists] = useState([])
   const resultList = useSelector((x : any) => x.userListReducer)
    const dispatch = useDispatch()
   const setUsers = payload =>{
     setUser({name:payload.name})
   }

   useEffect(()=>{
    //if(!resultList.data) dispatch(userListThunk())
   // else if(resultList.data !== null) console.log(resultList)
     
     
   })
   

   const selectCheck = e => {
       e.preventDefault()
       setUserSelect(e.target.value)
   }
 
  const handleSearch = (searchWord) => {
    
    alert("클릭")
    dispatch(userListThunk(searchWord))
 
    console.log("서치", resultList)
    
    console.log(setUsers.name)
    alert(searchWord);

  }
  const searchUser = e =>{
    e.preventDefault()
    alert("클릭")
   // dispatch(userListThunk())
    console.log(resultList)
  }

  //const resuletsList = useSelector()

  return (
    <div>
    <div className="userlist-content-title">
      <h2 className="userlist-menu-h2"> - 회원목록</h2>
      <h6 className="userlist-menu-h6">총회원수:()</h6>
      <div id="userlist-select-search-bar">
        <select className="form-control" id="userlist-select" value={userSelect} onChange={selectCheck}>
          <option  >선택</option>
          <option value="userid">아이디</option>
          <option value="username">가입자명</option>
          <option value="userlocal">거주지역</option>
        </select>
        
        <span id="userlist-search-bar">
          <SearchBar  onSearch={handleSearch}/>
        </span>  
      </div>
    </div>
   
   



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
              <td>ta</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default UsersList;