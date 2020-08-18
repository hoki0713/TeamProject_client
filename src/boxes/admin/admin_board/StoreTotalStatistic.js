import React, { useState, useEffect } from "react";
import "./StoreTotalStatistic.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  Bar } from "react-chartjs-2";
import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";


const LOCAL_USERS = "LOCAL_USERS";

export const storeStatisticAction = (data)=> ({
  type: LOCAL_USERS,
  payload: data,
});

export const storeStatisticReducer = (state = [], action) => {
  switch (action.type) {
    case LOCAL_USERS:
      return action.payload;
    default:
      return state;
  }
};

const StoreTotalStatistic = () => {
  const [chartData, setChartData] = useState({});
  const [localSelect, setLocalSelect] = useState("");
  const [storeLocalIndustryKey,setStoreLocalIndustryKey] =useState("");
  const [storeLocalIndustryValue,setStoreLocalIndustryValue] =useState("");
  const dispatch = useDispatch();


  const localSelectCheck = (e) => {
    e.preventDefault();
    setLocalSelect(e.target.value);
  };


useEffect(()=>{
  if(localSelect===""){
    axios
    .get(`http://localhost:8080/admins/store/chart-all`)
    .then((res)=>{
      console.log(res.data)
      
      const dataKey = [];
      const dataValue = [];

      Object.entries(res.data).forEach(([key,value])=>{
          dataKey.push(key)
          dataValue.push(value)
      })
      setStoreLocalIndustryKey(dataKey);
      setStoreLocalIndustryValue(dataValue);
    })
    .catch((err)=>{
      throw err;
    })
  }else {
    axios
      .get(`http://localhost:8080/admins/store/chart-local/${localSelect}`)
      .then((res)=>{
        console.log(res.data)

        const dataKey= [];
        const dataValue=[];

        Object.entries(res.data).forEach(([key,value])=>{
            dataKey.push(key)
            dataValue.push(value)
        })
        setStoreLocalIndustryKey(dataKey);
        setStoreLocalIndustryValue(dataValue);

      })
  }

},[localSelect])

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
      labels: storeLocalIndustryKey,
      datasets: [
        {type:'line',
          data: storeLocalIndustryValue,
				  borderWidth: 2,
          fill: false,
           backgroundColor: 'rgb(255,255,000,3)'
        },
        {type:'bar',
        data:storeLocalIndustryValue,
        backgroundColor: "rgba(000,000,102,3)",

        }
      ],
    });
  }, [storeLocalIndustryKey,storeLocalIndustryValue]);

  return (
    <div>
      <h1>가맹점 통계</h1>
      <div>
        <div id="graph-store-count-by-local">
          <div className="storeTotal-div">
            <h5 className="storeTotal-h5 font-weight-bold">지역별로 가맹점</h5>
            <h6 className="storeTotal-h6">-지역별로 가맹점 등록수 통계</h6>
          </div>
          
          <select
            id="storeTotal-select-local"
            value={localSelect}
            onChange={localSelectCheck}
          >
          <option value="" selected>지 역</option>
          <option value="고양">고양시</option>
          <option value="의정부">의정부시</option>
          </select>
        
      

          <div className="store-chartData">
            <Bar data={chartData} 
            options = {{
              responsive: true,
              title: {
                display: true,
                text: '지역/업종별로 가맹점 등록 수'
              },
              legend: { display: false },
              scales:{
                yAxes:[{
                  ticks:{
                    callback: function(value) {
                      if(parseInt(value) >= 1000){
                        return Intl.NumberFormat().format(value);
                      } else {
                        return value;
                      }
                    }
                  }
                }]
              }
            }}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoreTotalStatistic;
