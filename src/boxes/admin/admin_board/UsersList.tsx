import React,{useState} from 'react';
import { Table } from 'react-bootstrap'

import './UserList.css'
import { SearchBar } from '../../../items';


//import Pagination from 'react-bootstrap/Pagination'



function UsersList (){

  const [firstSearch,setFirstSearch] = useState(false);
  const [secondSearch,setSecondSearch] = useState(false);
  const [thirdSearch,setThirdSearch] = useState(false);

  const firstDropMenu = () => {
    setFirstSearch(!firstSearch)
    setSecondSearch(false)
    setThirdSearch(false)
  };
  


  const firstOpen = `dropdown-menu${ firstSearch? " show" : ""}`
  const secondOpen =`dropdown-menu${ secondSearch? " show" : ""}`
  const thirdOpen =`dropdown-menu${ thirdSearch? " show" : ""}`
  
  return (
    <div>

      <h2 className="userlist-menu-h2">-회원목록</h2> 
      <h6 className="userlist-menu-h6">총회원수:()</h6>

  <div>
  <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" 
      onClick={firstDropMenu}>
   검색기준
  </button>
  <span id="userlist-search-bar"><SearchBar/></span>
  <div className={firstOpen}  onClick={()=> setFirstSearch(false)} >
    <p className="dropdown-item">아이디</p>
    <p className="dropdown-item" >가입자명</p>
    <p className="dropdown-item" >거주지역</p>
  </div>
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




    </div>
  );
}

export default UsersList;