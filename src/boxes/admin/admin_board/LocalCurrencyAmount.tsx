import React,{useState, useEffect} from 'react';
import './LocalCurrencyAmount.css'
import { Table } from 'react-bootstrap'
import { SearchBar } from '../../../items'
import { Line,Doughnut } from 'react-chartjs-2'

const LocalCurrencyAmount = () => {
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] =useState("")
  const [citySelect,setCitySelect]=useState("")
  const [useStatusSelect,setUseStatusSelect] = useState("")
  const [chartData,setChartData] =useState({})


  const a =50
  const chart = () =>{
    setChartData({
      labels:['monday','tuesday','wednesday','thursday','friday'],
      datasets:[
        {
          label:'level of thickness',
          data:[a,5,15,76,5],
          backgroundColor:[
            'rgba(00,19,192,0.6)'
          ],
          borderwidth:4
        }
      ]
    })
  }

  useEffect(()=>{
    chart()
  },[])

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
      <Line data={chartData}/>
      <Doughnut data={chartData}/>
      </div>
      <h2>지역화폐 매출 목록</h2>
  
      
      <select  id="localcurrency_cityselect" value={citySelect}  onChange={citySelectChange}>
            <option selected>시도</option>
            <option >의정부시</option>
            <option>고양시</option>
            <option>수원시</option>
          </select>
          <select  id="localcurrency_statusselect" value={useStatusSelect} onChange={useStatusSelectChange}>
            <option selected>상태</option>
            <option value="use">사용완료</option>
            <option value="unused">미사용</option>
          </select>
          <div>
          <input className="currency_startdate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)}></input>
          <h4 className="currency_date_h4">  ~ </h4>
          <input className="currency_enddate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)}></input>
          <div id="localCurrency_search_bar">
          <SearchBar  onSearch={handleSearch}/>
        </div> 
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