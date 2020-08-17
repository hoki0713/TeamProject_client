import React, { useState, useEffect } from "react";
import "./StoreTotalStatistic.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  Bar } from "react-chartjs-2";


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



  useEffect(() => {
    
    setChartData({
      labels: storeLocalIndustryKey,
      datasets: [
        {type:'line',
          data: storeLocalIndustryValue,
				  borderWidth: 2,
				  fill: false,
        },
        {type:'bar',
        data:storeLocalIndustryValue

        }
      ],
    });
  }, [storeLocalIndustryKey,storeLocalIndustryValue]);

  // const test = () =>{
  //   alert(`test start: ${startDate} endDate:${endDate}`)
  //   let a = startDate.split('-')
  //   let b = endDate.split('-')
  //   console.log(`b2 ${b[2]}`)

  //    if(a[1]>b[1]){
  //       alert('시작날짜보다 빠를수 없습니다.')
  //       setEndDate(Date())
  //     }else if(a[2]>b[2]){
  //      alert('시작날짜보다 빠를수 없습니다.')
  //      setEndDate(Date())
  //     }

  // }

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
            <Bar data={chartData} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoreTotalStatistic;
