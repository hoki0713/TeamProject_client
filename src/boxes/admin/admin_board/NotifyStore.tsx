import React, { useState } from 'react';
import './NotifyStore.css'
import { Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'


const initialState={
  input:'',
  stores:[
    {
      number:1,
      name:'리',
      adress:'경기도',
      type:'일반음식',
      register:'2020-01-01'
    },
    {
      number:2,
      name:'액',
      adress:'서울',
      type:'기계',
      register:'2020-01-02'
    }
  ]
}

const NotifyStore = () => {

    const nameClick= (name) =>{
      alert(name)
      //<td onClick={e=> {alert(`${stores.name}`)}}>{stores.name}</td>
      //<td onClick={nameClick({stores.name})}>{stores.name}</td>
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
      <th>등록일</th>
      <th>가맹점 표시 해제</th>
    </tr>
  </thead>
  <tbody>
    
      {initialState.stores.map((stores,i)=>(
      <tr key={i}>
      <td>{stores.number}</td>
      <td  onClick={e=> {alert(`${stores.name}`)}}>{stores.name}</td>
      <td>{stores.adress}</td>
      <td>{stores.type}</td>
      <td>{stores.register}</td>
      <td><button>a</button></td>
      
      </tr>
      ))}
      
  
      
    
  </tbody>
</Table>



      </div>
    </div>
  );
};

export default NotifyStore;