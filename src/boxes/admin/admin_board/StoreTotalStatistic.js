import React, { useState, useEffect } from "react";
import "./StoreTotalStatistic.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";




const StoreTotalStatistic = () => {
  const [chartData, setChartData] = useState({});
  const [localSelect, setLocalSelect] = useState("");
  const [storeLocalIndustryKey, setStoreLocalIndustryKey] = useState("");
  const [storeLocalIndustryValue, setStoreLocalIndustryValue] = useState("");
  const [totalStoreCount,setTotalStoreCount]=useState(0);

  const localSelectCheck = (e) => {
    e.preventDefault();
    setLocalSelect(e.target.value);
  };

  useEffect(() => {
    if (localSelect === "") {
      axios
        .get(`http://localhost:8080/admins/store/chart-all`)
        .then((res) => {

          setTotalStoreCount(res.data.storeTotalCount)
          const dataKey = [];
          const dataValue = [];
          
        
          Object.entries(res.data.storeChartAll).forEach(([key, value]) => {
            dataKey.push(key);
            dataValue.push(value);
            
          });
          setStoreLocalIndustryKey(dataKey);
          setStoreLocalIndustryValue(dataValue);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      axios
        .get(`http://localhost:8080/admins/store/chart-local/${localSelect}`)
        .then((res) => {

          const dataKey = [];
          const dataValue = [];

          Object.entries(res.data).forEach(([key, value]) => {
            dataKey.push(key);
            dataValue.push(value);
          });
          setStoreLocalIndustryKey(dataKey);
          setStoreLocalIndustryValue(dataValue);
        });
    }
  }, [localSelect]);

  useEffect(() => {
    setChartData({
      labels: storeLocalIndustryKey,
      datasets: [
        {
          type: "line",
          data: storeLocalIndustryValue,
          borderWidth: 2,
          fill: false,
          backgroundColor: "rgb(255,255,000,3)",
        },
        {
          type: "bar",
          data: storeLocalIndustryValue,
          backgroundColor: "rgba(000,000,102,3)",
        },
      ],
    });
  }, [storeLocalIndustryKey, storeLocalIndustryValue]);

  return (
    <div>
      <h2 className="mt-4" style={{ "text-align": "center" }}>
        가맹점 통계 
      </h2>
  <h4  className="font-weight-bold" style={{ "text-align": "center" }} >총 가맹점 수: {Intl.NumberFormat().format(totalStoreCount)}개 ( 2020.07 기준 ) </h4>
  <h4 className="font-weight-bold" style={{textAlign: 'right'}}>출처 : 경기지역화폐 가맹점 현황(의정부,고양시)<br/>
<a href={"https://data.gg.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=3NPA52LBMO36CQEQ1GMY28894927&infSeq=1&order=&searchWord=%EC%A7%80%EC%97%AD%ED%99%94%ED%8F%90"}>-경기데이터드림</a></h4>
      <div>
        <div id="graph-store-count-by-local">
          <div className="storeTotal-div">
            <h5 className="storeTotal-h5 font-weight-bold">
              지역별로 가맹점
              <span style={{ "margin-left": "1rem", "font-size": "15px" }}>
                -지역별로 가맹점 등록수 통계
              </span>
            </h5>
            <select
              style={{"width" : "100px"}}
              className="form-control"
              id="storeTotal-select-local"
              value={localSelect}
              onChange={localSelectCheck}
            >
              <option value="" selected>
                지 역
              </option>
              <option value="고양">고양시</option>
              <option value="의정부">의정부시</option>
            </select>
          </div>

          <div className="store-chartData">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                title: {
                  display: true,
                  text: "지역/업종별로 가맹점 등록 수",
                },
                legend: { display: false },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        callback: function(value) {
                          if (parseInt(value) >= 1000) {
                            return Intl.NumberFormat().format(value);
                          } else {
                            return value;
                          }
                        },
                        max:7000,
                        min:0
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreTotalStatistic;
