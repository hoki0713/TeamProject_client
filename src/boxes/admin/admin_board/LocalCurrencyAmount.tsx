import React,{useState} from 'react';
import './LocalCurrencyAmount.css'
import { Table } from 'react-bootstrap'
import { SearchBar } from '../../../items'

const LocalCurrencyAmount = () => {
  const[startDate,setStartDate] = useState("")
  const[endDate,setEndDate] =useState("")
  const[citySelect,setCitySelect]=useState("")
  const[useStatusSelect,setUseStatusSelect] = useState("")

  const handleSearch = (searchWord) =>{
    alert(searchWord)
    if(startDate>endDate) {alert(`시작날짜보다 빠를 수 없습니다.`); setEndDate("")}
    
  }

  const citySelectChange = e =>{
    e.preventDefault()
    setCitySelect(e.target.value)
  }

  const useStatusSelectChange = e=>{
    e.preventDefault()
    setUseStatusSelect(e.target.value)
  }

  
  return (
    <div>
      <h1>지역화폐 매출</h1>
      <div>
        <img className="localcurrency-img" src="https://www.thoughtco.com/thmb/eHY1wWdh-9JF6HJ8s1cAwxLcPaQ=/1647x1098/filters:fill%28auto,1%29/Pie-Chart-copy-58b844263df78c060e67c91c-9e3477304ba54a0da43d2289a5a90b45.jpg" alt=""/>
      </div>

      <h2>지역화폐 매출 목록</h2>
      
      <select  id="recommend-select" value={citySelect} onChange={citySelectChange}>
            <option selected>시도</option>
            <option value="ten">의정부시</option>
            <option value="twenty">고양시</option>
            <option value="thirty">수원시</option>
          </select>
          <select  id="recommend-select" value={useStatusSelect} onChange={useStatusSelectChange}>
            <option selected>상태</option>
            <option value="ten">사용완료</option>
            <option value="twenty">미사용</option>
          </select>
          <div>
          <input className="recommend-data" type="date" value={startDate} onChange={e => setStartDate(e.target.value)}></input>
          <h4 className="recommend-data-h4"> &nbsp; ~ </h4>
          <input className="recommend-data" type="date" value={endDate} onChange={e => setEndDate(e.target.value)}></input>
          <span id="userlist-search-bar">
          <SearchBar  onSearch={handleSearch}/>
        </span> 
        </div>
        <br/>
      <Table className="Table">
      <tr>
              <th>No</th>
              <th>일련번호</th>
              <th>상태</th>
              <th>지역명 및 지역화폐</th>
              <th>구매자</th>
              <th>구매일</th>
              <th>사용일 또는 취소일</th>
            </tr>
            <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>ta</td>
              <td>Table cell12</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
      </Table>
    </div>
  );
};

export default LocalCurrencyAmount;