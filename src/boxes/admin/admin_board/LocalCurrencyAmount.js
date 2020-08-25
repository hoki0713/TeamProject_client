import React, { useState, useEffect } from "react";
import "./LocalCurrencyAmount.css";
import { Table } from "react-bootstrap";
import { SearchBar } from "../../../items";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import {NewPagination} from '../../../items'

const LocalCurrencyAmount = () => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [useStartDate, setUseStartDate] = useState("");
  const [useEndDate, setUseEndDate] = useState("");
  const [citySelect, setCitySelect] = useState("");
  const [useStatusSelect, setUseStatusSelect] = useState("");
  const [chartData, setChartData] = useState({});
  const [currencyName, setCurrencyName] = useState("");
  const [totalKeys,setTotalKeys] = useState([]);
  const [totalValues,setTotalValues] = useState([]);
  const [salesTotalKeys,setSalesTotalKeys] = useState([]);
  const [salesTotalValues,setSalesTotalValues] = useState([]);
  const [salesTotalChart,setSalesTotalChart] = useState({});
  const [useChart,setUseChart]=useState({});
  const [localSelect,setLocalSelect]=useState("");
  const [useTotalLocalKeys,setUseTotalLocalKeys] = useState([]);
  const [useTotalLocalValues,setUseTotalLocalValues] =useState([]);
  const [salesList,setSalesList] = useState([]);
  const [totalPages,setTotalPages] = useState(0);
  const [currentPage,setCurrentPage] =useState(0);
 

  const paginate = (page) =>{
    setCurrentPage(page);
  }

  useEffect(()=>{
    axios
      .get(`http://localhost:8080/admins/sales/list/${currentPage}`)
      .then((res)=>{
        setSalesList(res.data.salesList)
        setTotalPages(res.data.totalPages)
      })
      .catch((err)=>{
        throw err;
      })
  },[currentPage]);

  useEffect(()=>{
    axios
      .get(`http://localhost:8080/admins/currency/month/total`)
      .then((res) => {
        const dataKey = [];
        const dataValue = [];
        Object.entries(res.data).forEach(([key, value]) => {
          dataKey.push(key);
          dataValue.push(value);
        });
        setTotalKeys(dataKey);
        setTotalValues(dataValue);
      })
      .catch((err)=>{
        throw err;
      })
  },[]);

  useEffect(() => {
    if(currencyName ==="") {
      axios
        .get(`http://localhost:8080/admins/voucher/sales-total`)
        .then((res)=>{
          const datakeys = [];
          const datavalues = [];
          Object.entries(res.data).forEach(([key,value])=>{
            datakeys.push(key);
            datavalues.push(value.unitPrice);
          });
          setSalesTotalKeys(datakeys);
          setSalesTotalValues(datavalues);
        })
        .catch((err)=>{
          throw err;
        })
    }
  },[]);

  useEffect(()=> {
    if(localSelect ==="") {
      axios
      .get(`http://localhost:8080/admins/useChart/total`)
      .then((res)=>{
        const dataKeys = [];
        const dataValues = [];
        Object.entries(res.data).forEach(([key,value])=>{
          dataKeys.push(key)
          dataValues.push(value)
        });
        setUseTotalLocalKeys(dataKeys);
        setUseTotalLocalValues(dataValues);
      })
      .catch((err) => {
        throw err;
      })
    }
  },[]);

  const color = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    
    setChartData({
      labels: totalKeys,
      datasets: [
        {
          data: totalValues,
          backgroundColor: [
            "rgb(153,153,153,0.2)",
            "rgb(255,153,000,1)",
            "rgb(255,255,000,1)",
            "rgb(000,153,000,1)",
            "rgb(000,000,204,1)",
            "rgb(000,000,051,1)",
            "rgb(102,000,102,1)",
            "rgb(102,204,255,1)",
          ],
        },
      ],
    })

    setSalesTotalChart({
      labels: salesTotalKeys,
      datasets: [
        {
          data: salesTotalValues,
          backgroundColor:salesTotalKeys.map((key) => color())
        },
      ],
    })
      
    setUseChart({
      labels: useTotalLocalKeys,
      datasets: [
        {
          data: useTotalLocalValues,
          backgroundColor: useTotalLocalKeys.map((key) => color())
        },
      ],
    })
  }, [totalKeys,
    totalValues,
    salesTotalValues,
    salesTotalKeys,
    useTotalLocalKeys,
    useTotalLocalValues]);

  const start_end_date = (e) => {
    e.preventDefault();

    if (startDate > endDate) {
      alert("시작날짜보다 빠를수 없습니다.");
      setEndDate("");
    }

    if (currencyName === "") {
      alert(`화폐명을 선택해주세요`);
    } else if (startDate === "" || endDate === "") {
      alert(`기간을 선택해주세요`);
    } else if (startDate.split("-")[0] !== endDate.split("-")[0]) {
      alert(` 같은년도 이내로 선택해주세요.`);
    } else {
      axios
        .get(
          `http://localhost:8080/admins/voucher/name-list/${currencyName}/${startDate}/${endDate}`
        )
        .then((res) => {
          
       
          const monthLocalTotalKeys = [];
          const monthLocalTotalValues = [];

          Object.entries(res.data).forEach(([key, value]) => {
            monthLocalTotalKeys.push(key);
            monthLocalTotalValues.push(value.unitPrice);
          });

          setSalesTotalKeys(monthLocalTotalKeys);
          setSalesTotalValues(monthLocalTotalValues);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const currencyNameCheck = (e) => {
    e.preventDefault();
    setCurrencyName(e.target.value);
  };

  const use_start_end_date = (e) => {
    e.preventDefault();

    if (useStartDate > useEndDate) {
      alert("시작날짜보다 빠를수 없습니다.");
      setUseEndDate("");
    } else if (useStartDate ==="" ||useEndDate ===""  ) {
      alert(`기간을 선택해주세요`);
    } else if(localSelect==="") {
      alert(`지역을 선택해주세요`);
    } else if(useStartDate.split("-")[0] !== useEndDate.split("-")[0]){ 
      alert(` 같은년도 이내로 선택해주세요.`); 
    } else {
        axios 
        .get(`http://localhost:8080/admins/useChart/test/${localSelect}/${useStartDate}/${useEndDate}`)
        .then((res)=>{
            const useLocalKeys = [];
            const useLocalValues = [];

            Object.entries(res.data).forEach(([key,value])=>{
                useLocalKeys.push(key);
                useLocalValues.push(value);
            });
            setUseTotalLocalKeys(useLocalKeys);
            setUseTotalLocalValues(useLocalValues);
        })
        .catch((err)=>{
            throw err;
        });
    }
  };


  const handleSearch = (searchWord) => {
   
     if (citySelect==="") {
      alert(`지역을 선택해주세요`);
    } else if (useStatusSelect ==="") {
      alert('상태를 선택해 주세요');
    } else if(searchWord === "") {alert('아이디를 입력해주세요')}
    else {
       axios
        .get(`http://localhost:8080/admins/sales/search`,{
          params:{
            useStatusSelect:useStatusSelect,
            citySelect:citySelect,
            searchWord:searchWord
          }
        })
        .then((res)=>{
      
            setSalesList(res.data.sales)
        })
        .catch((err)=>{
            throw err;
        })
     }
  };

  return (
    <div>
      <h2 className="mt-4" style={{"text-align" : "center"}}>지역화폐 매출</h2>
      <div>
        <div className="currencyTotal-div-byCurrencyName">
          <div id="graph-title">
            <h5 className="currency-h5 font-weight-bold">
              지역화폐 명에 따른 매출
            </h5>
            <h6 className="currencyTotal-h6">
              -각 지역화폐 Id 또는 명에 따른 매출 통계
            </h6>
            <select
              id="currencyTotal-select-currency"
              value={currencyName}
              onChange={currencyNameCheck}
            >
              <option value="" selected>화폐명</option>
              <option value="의정부">의정부사랑상품권</option>
              <option value="고양">고양사랑상품권</option>
                <option value="가평">가평사랑상품권</option>
                <option value="과천">과천사랑상품권</option>
                <option value="광명">광명사랑상품권</option>
                <option value="광주">광주사랑상품권</option>
                <option value="구리">구리사랑상품권</option>
                <option value="군포">군포사랑상품권</option>
                <option value="김포">김포사랑상품권</option>
                <option value="남양주">남양주사랑상품권</option>
                <option value="동두천">동두천사랑상품권</option>
                <option value="부천">부천사랑상품권</option>
                <option value="성남">성남사랑상품권</option>
                <option value="수원">수원사랑상품권</option>
                <option value="시흥">시흥사랑상품권</option>
                <option value="안산">안산사랑상품권</option>
                <option value="안성">안성사랑상품권</option>
                <option value="안양">안양사랑상품권</option>
                <option value="양주">양주사랑상품권</option>
                <option value="양평">양평사랑상품권</option>
                <option value="여주">여주사랑상품권</option>
                <option value="연천">연천사랑상품권</option>
                <option value="오산">오산사랑상품권</option>
                <option value="용인">용인사랑상품권</option>
                <option value="의왕">의왕사랑상품권</option>
                <option value="이천">이천사랑상품권</option>
                <option value="파주">파주사랑상품권</option>
                <option value="평택">평택사랑상품권</option>
                <option value="포천">포천사랑상품권</option>
                <option value="하남">하남사랑상품권</option>
                <option value="화성">화성사랑상품권</option>
            </select>
          </div>
          <div>
              <input
                className="currencyTotal-data-byCurrencyName"
                min="2020-01-01"
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span> ~  </span>
              <input
                className="currencyTotal-data-byCurrencyName"
                min=""
                type="month"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                className="currencyTotal-button btn btn-outline-primary"
                type="submit"
                onClick={start_end_date}
                value="조회"
              />
            </div>
        </div>
        <div className="currencyTotal-Bar">
          <Bar
            data={salesTotalChart}
            width={80}
            height={50}
            options={{
              responsive: true,
              legend: { display: false },
              scales: {
                yAxes:[{
                  ticks:{
                 
                    callback: function(value) {
                      if(parseInt(value) >= 1000){
                        return Intl.NumberFormat().format(value)
                      } else {
                        return value;
                      }
                    }
                  }
                }]
              },
              tooltips: {
                displayColors: false,
                backgroundColor: "#0a6dff",
                  callbacks: {
                      label: function(tooltipItem) {
                      return Intl.NumberFormat().format(tooltipItem.yLabel)
                      }
            }
          }
            }}
          />
        </div>
      </div>
      <div id="second-graph-line">
        <div className="currencyTotal-div">
          <div>
            <h5 className="font-weight-bold">사용여부에 따른 통계</h5>
            <h6 className="currencyTotal-h6">
              -사용/미사용으로 나눠서 기간별로 통계
              <select
                id="userLocal-select"
                value={localSelect}
                onChange={(e) => setLocalSelect(e.target.value)}
              >
                <option value="" selected>지역선택</option>
                <option value="고양">고양시</option>
                <option value="의정부">의정부시</option>
                <option value="연천">연천군</option>
                <option value="포천">포천시</option>
                <option value="파주">파주시</option>
                <option value="동두천">동두천시</option>
                <option value="양주">양주시</option>
                <option value="가평">가평군</option>
                <option value="김포">김포시</option>
                <option value="남양주">남양주시</option>
                <option value="구리">구리시</option>
                <option value="하남">하남시</option>
                <option value="양평">양평군</option>
                <option value="광주">광주시</option>
                <option value="여주">여주시</option>
                <option value="이천">이천시</option>
                <option value="용인">용인시</option>
                <option value="안성">안성시</option>
                <option value="평택">평택시</option>
                <option value="화성">화성시</option>
                <option value="수원">수원시</option>
                <option value="오산">오산시</option>
                <option value="안산">안산시</option>
                <option value="군포">군포시</option>
                <option value="의왕">의왕시</option>
                <option value="안양">안양시</option>
                <option value="과천">과천시</option>
                <option value="부천">부천시</option>
                <option value="광명">광명시</option>
                <option value="성남">성남시</option>
                <option value="시흥">시흥시</option>
              </select>
            </h6>
          </div>
          <div>
            <h6 className="currencyTotal-h5-input font-weight-bold">
              필수 입력:
            </h6>
            <div className="useDate-input">
            <input
              className="currencyTotal-data-byCurrencyName"
              min="2020-01-01"
              type="date"
              value={useStartDate}
              onChange={(e) => setUseStartDate(e.target.value)}
            />
            <span>  ~  </span>
            <input
              className="currencyTotal-data-byCurrencyName"
              min=""
              type="date"
              value={useEndDate}
              onChange={(e) => setUseEndDate(e.target.value)}
            />
            <input
              className="currencyTotal-button btn btn-outline-primary"
              type="submit"
              onClick={use_start_end_date}
              value="조회"
            />
          </div>
           
          </div>
          <div className="currencyTotal-Bar-byState">
            <Bar data={useChart}
            options={{
              legend: {
                display: false,
              },
              scales: {
                yAxes:[{
                  ticks:{
                       beginAtZero:true,
                    callback: function(value) {
                      if(parseInt(value) >= 1000){
                        return Intl.NumberFormat().format(value)
                      } else {
                        return value;
                      }
                    }
                  }
                }]
              },
              tooltips: {
                displayColors: false,
                backgroundColor: "#0a6dff",
                  callbacks: {
                      label: function(tooltipItem) {
                      return Intl.NumberFormat().format(tooltipItem.yLabel)
                      }
            }
          }

            }} />
          </div>
        </div>
        <div className="currencyTotal-div" id="second-grh">
          <h5 className="font-weight-bold">지역화폐 총 매출통계</h5>
          <div>
            <Line
              data={chartData}
              width={100}
              height={50}
              options={{
                legend: {
                  display: false,
                },
             
                scales: {
                  yAxes:[{
                    ticks:{
                      
                      callback: function(value) {
                        if(parseInt(value) >= 1000){
                          return Intl.NumberFormat().format(value)
                        } else {
                          return value;
                        }
                      }
                    }
                  }]
                },
                tooltips: {
                  displayColors: false,
                  backgroundColor: "#0a6dff",
                    callbacks: {
                        label: function(tooltipItem) {
                        return Intl.NumberFormat().format(tooltipItem.yLabel)
                        }
              }
            }
  
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="curreny-div">
          <h2>지역화폐 매출 목록</h2>
          <select
            id="localcurrency_cityselect"
            value={citySelect}
            onChange={(e) => setCitySelect(e.target.value)}
          >
            <option value="" selected>지역선택</option>
                <option value="고양시">고양시</option>
                <option value="의정부시">의정부시</option>
                <option value="연천군">연천군</option>
                <option value="포천시">포천시</option>
                <option value="파주시">파주시</option>
                <option value="동두천시">동두천시</option>
                <option value="양주시">양주시</option>
                <option value="가평군">가평군</option>
                <option value="김포시">김포시</option>
                <option value="남양주시">남양주시</option>
                <option value="구리시">구리시</option>
                <option value="하남시">하남시</option>
                <option value="양평군">양평군</option>
                <option value="광주시">광주시</option>
                <option value="여주시">여주시</option>
                <option value="이천시">이천시</option>
                <option value="용인시">용인시</option>
                <option value="안성시">안성시</option>
                <option value="평택시">평택시</option>
                <option value="화성시">화성시</option>
                <option value="수원시">수원시</option>
                <option value="오산시">오산시</option>
                <option value="안산시">안산시</option>
                <option value="군포시">군포시</option>
                <option value="의왕시">의왕시</option>
                <option value="안양시">안양시</option>
                <option value="과천시">과천시</option>
                <option value="부천시">부천시</option>
                <option value="광명시">광명시</option>
                <option value="성남시">성남시</option>
                <option value="시흥시">시흥시</option>
          </select>
          <select
            id="localcurrency_statusselect"
            value={useStatusSelect}
            onChange={(e) => setUseStatusSelect(e.target.value)}
          >
            <option value="" selected>상태</option>
            <option value="사용완료">사용완료</option>
            <option value="취소완료">취소완료</option>
            <option value="미사용">미사용</option>
          </select>
          <div>
            <div id="localCurrency_search_bar">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <br />
          <Table className="Table">
            <tr>
              <th>No</th>
        
              <th>상태</th>
              <th>지역명 및 지역화폐</th>
              <th>구매자</th>
              <th>구매가격</th>
              <th>구매일</th>
              <th>사용일 </th>
              <th>취소일 </th>
              
            </tr>
            <tbody>
            {salesList.map((info,i) => (
              <tr key={i}>
                <td>{i + 1 + 50 * currentPage}</td>
                <td>{info.currencyState}</td>
                <td>{info.localCurrencyName}</td>
                <td>{info.userId}</td>
                <td>{info.unitPrice}</td>
                <td>{info.salesDate}</td>
                <td>{info.useDate}</td>   
                <td>{info.cancelDate}</td> 
              </tr>
              )
            )}
            </tbody>
          </Table>
          <NewPagination
          paginate={paginate}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        </div>
      </div>
    </div>
  )

};

export default LocalCurrencyAmount;