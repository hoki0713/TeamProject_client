import React from 'react';
import './NotifyStore.css'
import { Table } from 'react-bootstrap'


const NotifyStore = () => {
  const initialState={
    input:'',
    stores:[
      {
        number:1,
        name:'리',
        adress:'경기도'
      },
      {
        number:2,
        name:'액',
        adress:'서울'
      }
    ]
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
      <th>가맹점 번호</th>
      <th>가맹점 이름</th>
      <th>주 소</th>
      <th>분 류</th>
      <th>등록일</th>
      <th>가맹점 표시 해제</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Table cell</td>
      <td >Table cell</td>
      <td>Table cell</td>
      <button>a</button>
      <td>Table cell</td>
      
    </tr>
  </tbody>
</Table>



      </div>
    </div>
  );
};

export default NotifyStore;