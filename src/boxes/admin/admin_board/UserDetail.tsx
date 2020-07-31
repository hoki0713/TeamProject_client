import React, { useState } from 'react'
import './UserDetail.css'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'


const UserDetail = () =>{
  const [userid,setUserId] =useState("")
  const [username,setUserName] =useState("")
  const [birthday,setBirthday] =useState("")
  const [gender,setGender] = useState("")
  const [adress,setAderss] = useState("")
  const [addAderss,setAddAderss] = useState("")
  const [email,setEmail] = useState("")



  return(
    <>
      <h1>회원 상세정보</h1>
    <div>
      <form>
      <div className="detail-form">
        <p className="user-p">아이디</p>
        <div className="input-group">
          <input 
            type="text"
            value={userid}
            className="form-control"
            readOnly
           />
        </div>
      </div>
      <div className="detail-form">
        <p>이름</p>
        <div className="input-group">
          <input 
            type="text"
            value={username}
            className="form-control"
            readOnly
           />
        </div>
      </div>
      <div className="detail-form">
        <p>생년월일</p>
        <div className="input-group">
          <input 
            type="text"
            value={birthday}
            className="form-control"
            readOnly
           />
        </div>
      </div>
      <div className="detail-form">
        <p>성별</p>
        <div className="input-group">
          <input 
            type="text"
            value={gender}
            className="form-control"
            readOnly
           />
        </div>
      </div>
      <div className="detail-form">
        <p>주소</p>
        <div className="input-group">
          <input 
            type="text"
            value={adress}
            className="form-control"
            readOnly
           />
        </div>
      </div>
      <div className="detail-form">
        <p>추가주소</p>
        <div className="input-group">
          <input 
            type="text"
            value={addAderss}
            className="form-control"
            readOnly
           />
        </div>
        
      </div>
      <div className="detail-form">
        <p>이메일</p>
        <div className="input-group">
          <input 
            type="text"
            value={email}
            className="form-control"
            readOnly
           />
        </div>
      </div>
      </form>

      <Link to="/admin/users-list"><Button className="user-detail-btn" variant="primary">확인</Button></Link>
    </div>



    </>
  )
}

export default UserDetail
