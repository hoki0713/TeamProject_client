import React, { useState, useEffect } from "react";
import "./LocalCurrencyAmount.css";
import { Table } from "react-bootstrap";
import { SearchBar } from "../../../items";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";

const CURRENCY_AMOUNT = "CURRENCY_AMOUNT";

export const currencyAction = (data) => ({
  type: CURRENCY_AMOUNT,
  payload: data,
});

export const currencyReducer = (state = [], action) => {
  switch (action.type) {
    case CURRENCY_AMOUNT:
      return action.payload;
    default:
      return state;
  }
};

const LocalCurrencyAmount = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [useStartDate,setUseStartDate] = useState("");
  const [useEndDate,setUseEndDate] = useState("");
  const [citySelect, setCitySelect] = useState("");
  const [useStatusSelect, setUseStatusSelect] = useState("");
  const [chartData, setChartData] = useState({});
  const [currencyName, setCurrencyName] = useState("");
  const [totalKeys,setTotalKeys] = useState([]);
  const [totalValues,setTotalValues] = useState([]);
  const [salesTotalKeys,setSalesTotalKeys] = useState([]);
  const [salesTotalValues,setSalesTotalValues] = useState([]);
  const [salesTotalChart,setSalesTotalChart] = useState({});
  const [useSelectCheck,setUseSelectCheck] = useState("");
  


  useEffect(()=>{
    axios
    .get(`http://localhost:8080/admins/currency/month/total`)
    .then((res)=>{
      const dataKey=[];
      const dataValue=[];
      Object.entries(res.data).forEach(([key,value])=>{
          dataKey.push(key);
          dataValue.push(value);
      });
      setTotalKeys(dataKey);
      setTotalValues(dataValue);
    })
    .catch((err)=>{
      throw err;
    })
    if(currencyName ===""){
    axios
    .get(`http://localhost:8080/admins/voucher/sales-total`)
    .then((res)=>{
     
      const datakeys = [];
      const datavalues = [];

      Object.entries(res.data).forEach(([key,value])=>{
   
        datakeys.push(key)
        datavalues.push(value)
      })
      setSalesTotalKeys(datakeys);
      setSalesTotalValues(datavalues);
      
      
    })
    .catch((err)=>{
      throw err;
    })
  }
  },[currencyName])

  useEffect(()=>{

      setChartData({
        labels: totalKeys,
        datasets:[
          {
            data:totalValues,
            backgroundColor:['rgb(153,153,153,0.2)','rgb(255,153,000,1)','rgb(255,255,000,1)','rgb(000,153,000,1)',
          'rgb(000,000,204,1)','rgb(000,000,051,1)','rgb(102,000,102,1)','rgb(102,204,255,1)']
          }
        ]
      })
      setSalesTotalChart({
        labels: salesTotalKeys,
        datasets:[
          {
            data:salesTotalValues,
            backgroundColor:'rgb(000,000,051,0.5)'
          }
        ]
      })
  },[totalKeys,totalValues,salesTotalValues,salesTotalKeys])



  const start_end_date = e => {
    e.preventDefault();

    if (startDate > endDate) {
      alert("시작날짜보다 빠를수 없습니다.");
      setEndDate("");
    }
    if(currencyName === "") 
    {alert(`화폐명을 선택해주세요`)} 
    else if(startDate ==="" ||endDate ===""  ){
      alert(`기간을 선택해주세요`)
    }else{
      axios
      .get(`http://localhost:8080/admins/voucher/name-list/${currencyName}/${startDate}/${endDate}`)
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{
        throw err;
      })
    }
  };

  const currencyNameCheck = (e) =>{
    e.preventDefault()

    setCurrencyName(e.target.value)
  }

  const use_start_end_date = e =>{
    e.preventDefault();

    if (useStartDate > useEndDate) {
      alert("시작날짜보다 빠를수 없습니다.");
      setUseEndDate("");
    }else if(useStartDate ==="" ||useEndDate ===""  ){
      alert(`기간을 선택해주세요`)
    }else{
  
  }
  }


  const handleSearch = (searchWord) => {
    alert(searchWord);
    if (startDate > endDate) {
      alert(`시작날짜보다 빠를 수 없습니다.`);
      setEndDate("");
    }
  };

  return (
    <div>
      <h1>지역화폐 매출</h1>
      
        <div>
         
          <div className="currencyTotal-line">
          <h5 className="currencyTotal-h5 font-weight-bold">
            지역화페 총 매출통계
          </h5>
            <Line
              data={chartData}
              options={{
                legend: {
                  display: false,
                },
              }}
            />
          </div>
        </div>

        
        <div>
        <h5 className="currencyTotal-h5-input font-weight-bold">필수 입력:</h5>
        
        <div>
          <input
            className="currencyTotal-data"
            min="2020-01-01"
            type="month"
            value={startDate}
            onChange={e=>setStartDate(e.target.value)}
          ></input>
          <h4 className="currencyTotal-data"> &nbsp; ~ &nbsp; </h4>
          <input
            min=""
            type="month"
            value={endDate}
            onChange={e=>setEndDate(e.target.value)}
          ></input>
          <input
            className="currencyTotal-button btn btn-outline-primary"
            type="submit"
            onClick={start_end_date}
            value="조회"
          />
        </div>
        </div>   
        <div className="currencyTotal-div">
          <h5 className="currency-h5 font-weight-bold">
            지역화폐 명에 따른 매출
          </h5>
          <h6 className="currencyTotal-h6">
            -각 지역화폐 Id 또는 명에 따른 매출 통계
          </h6>
        </div>
        <select
          id="currencyTotal-select-currency"
          value={currencyName}
          onChange={currencyNameCheck}
        >
          <option value="" selected>화폐명</option>
          <option value="고양">고양시 지역화폐</option>
          <option value="의정부">의정부시 지역화폐</option>
        </select>

        <div>
          <div className="currencyTotal-Bar">

          <Bar
            data={salesTotalChart}
            options={{
              responsive: true,
              title: { text: "THICCNESS SCATIL", display: true },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                    },
                  },
                ],
              },
              tooltips: {
                displayColors: false,
                backgroundColor: "#0a6dff",
              },
            }}
          />
    </div>
    <div className="useDate-input">
          <h5 className="currencyTotal-h5-input font-weight-bold">필수 입력:</h5>
          <input
            className="currencyTotal-data"
            min="2020-01-01"
            type="month"
            value={useStartDate}
            onChange={e=>setUseStartDate(e.target.value)}
          ></input>
          <h4 className="currencyTotal-data"> &nbsp; ~ &nbsp; </h4>
          <input
            min=""
            type="month"
            value={useEndDate}
            onChange={e=>setUseEndDate(e.target.value)}
          ></input>
          <input
            className="currencyTotal-button btn btn-outline-primary"
            type="submit"
            onClick={use_start_end_date}
            value="조회"
          />
        </div>
          <div className="currencyTotal-div">
            <h5 className="currencyUse-h5 font-weight-bold">
              사용여부에 따른 통계
            </h5>
            <h6 className="currencyTotalUse-h6">
              -사용/미사용으로 나눠서 기간별로 통계
            </h6>
          </div>
          
          <select
            id="currencyTotal-useSelect-currency"
            value={useSelectCheck}
            onChange={e=>setUseSelectCheck(e.tartget.value)}
          >
            <option selected>사용여부</option>
            <option value="useOne">사용</option>
            <option value="unUsedOne">미사용</option>
          </select>
          

          <div className="currencyTotal-Bar">
            <Bar data={chartData} />
          </div>

          <div className="curreny-div">
        <h2>지역화폐 매출 목록</h2>

        <select
          id="localcurrency_cityselect"
          value={citySelect}
          onChange={e=>setCitySelect(e.target.value)}
        >
          <option selected>시도</option>
          <option>의정부시</option>
          <option>고양시</option>
          <option>수원시</option>
        </select>
        <select
          id="localcurrency_statusselect"
          value={useStatusSelect}
          onChange={e=>setUseStatusSelect(e.target.value)}
        >
          <option selected>상태</option>
          <option value="use">사용완료</option>
          <option value="unused">미사용</option>
        </select>
        <div>
          <input
            className="currency_startdate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <h4 className="currency_date_h4"> ~ </h4>
          <input
            className="currency_enddate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
          <div id="localCurrency_search_bar">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <br />
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
        </div>
      


    </div>
  );
};

export default LocalCurrencyAmount;
