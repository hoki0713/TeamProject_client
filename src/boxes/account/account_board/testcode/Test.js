import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  const [userList, setUesrList] = useState([]);
  const [tableDataRows, setTableDataRows] = useState([]);

  const tableData = {
    columns : {
      
    },
    rows : tableDataRows,
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/test`)
      .then((response) => {
        const tempRows = [];
        console.log(response.data);
        setUesrList(response.data.content);
        response.data.content.forEach(user => {
          const userData = {}
          userData.id = user.id;
          userData.userId = user.userId;
          tempRows.push(userData);
        })
        setTableDataRows(tempRows);
      })
      .catch((error) => {
        throw error;
      })
  },[]);

  useEffect(() =>{
    if(tableDataRows) {
      console.log(tableDataRows);
    }
  },[tableDataRows])


  return (
    <div>
      {/* <table className="table">
      <thead>
        <tr>
          <td>유저번호</td>
          <td>유저아이디</td>
        </tr>
      </thead>
      <tbody>
      {userList.map((user, i) => (
        <tr key={i}>
          <td>{user.id}</td>
          <td>{user.userId}</td>
        </tr> 
      ))}  
      </tbody>
      </table> */}
      
    </div>
  );
};

export default Test;