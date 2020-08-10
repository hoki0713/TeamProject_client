import React, { useState, useEffect } from "react";
import "./LocalCurrencyAmount.css";
import { Table } from "react-bootstrap";
import { SearchBar } from "../../../items";
import { Line, Doughnut, Bar, Polar } from "react-chartjs-2";
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
  const [citySelect, setCitySelect] = useState("");
  const [useStatusSelect, setUseStatusSelect] = useState("");
  const [chartData, setChartData] = useState({});
  const [currencyName, setCurrencyName] = useState("");

  const startDateClick = (e) => {
    e.preventDefault();
    setStartDate(e.target.value);
  };

  const endDateClick = (e) => {
    e.preventDefault();
    setEndDate(e.target.value);
  };

  const start_end_date = (e) => {
    e.preventDefault();
    if (startDate > endDate) {
      alert("시작날짜보다 빠를수 없습니다.");
      setEndDate("");
    }
  };

  const currencyNameSelectCheck = (e) => {
    e.preventDefault();
    setCurrencyName(e.target.value);
  };

  const chart = () => {
    setChartData({
      labels: ["김포시", "연천군", "파주시"],
      datasets: [
        {
          label: "level of thickness",
          data: [306, 20, 302],
          backgroundColor: [
            "rgba(05,19,192,0.6)",
            "rgba(05,19,1,0.6)",
            "rgba(03,1,1,2.6)",
          ],
          gridLines: {
            display: false,
          },
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  const handleSearch = (searchWord) => {
    alert(searchWord);
    if (startDate > endDate) {
      alert(`시작날짜보다 빠를 수 없습니다.`);
      setEndDate("");
    }
  };

  const citySelectChange = (e) => {
    e.preventDefault();
    setCitySelect(e.target.value);
  };

  const useStatusSelectChange = (e) => {
    e.preventDefault();
    setUseStatusSelect(e.target.value);
  };

  const test = (e) => {
    e.preventDefault();
    alert(e);
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
            type="date"
            value={startDate}
            onChange={startDateClick}
          ></input>
          <h4 className="currencyTotal-data"> &nbsp; ~ &nbsp; </h4>
          <input
            min=""
            type="date"
            value={endDate}
            onChange={endDateClick}
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
          onChange={currencyNameSelectCheck}
        >
          <option selected>화폐명</option>
          <option value="koyang">고양시 지역화폐</option>
          <option value="uijeongbu">의정부시 지역화폐</option>
        </select>

        <div>
          <div className="currencyTotal-Bar">

          <Bar
            data={chartData}
            options={{
              responsive: true,
              title: { text: "THICCNESS SCATIL", display: true },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      baginAtZero: true,
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
            value={currencyName}
            onChange={currencyNameSelectCheck}
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
          onChange={citySelectChange}
        >
          <option selected>시도</option>
          <option>의정부시</option>
          <option>고양시</option>
          <option>수원시</option>
        </select>
        <select
          id="localcurrency_statusselect"
          value={useStatusSelect}
          onChange={useStatusSelectChange}
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
