import React, { useState, useEffect } from "react";
import "./StoreTotalStatistic.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  Line } from "react-chartjs-2";


const LOCAL_USERS = "LOCAL_USERS";

export const storeStatisticAction = (data: any) => ({
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
  const [valueArr, setValueArr] = useState([]);
  const [chartData, setChartData] = useState({});
  const [localSelect, setLocalSelect] = useState("");
  const [industrySelect, setIndustrySelect] = useState("");

  const dispatch = useDispatch();

  const industrySelectCheck = (e) => {
    e.preventDefault();
    setIndustrySelect(e.target.value);
  };

  const localSelectCheck = (e) => {
    e.preventDefault();
    setLocalSelect(e.target.value);
  };

  const storeLocalThunk = (localSelect) => (dispatch) => {
    axios
      .get(`http://localhost:8080/stores/localChart/${localSelect}`)
      .then((res) => {
        dispatch(storeStatisticAction(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    if (localSelect !== "") {
      dispatch(storeLocalThunk(localSelect));
    }
  }, [localSelect]);

  const chart = () => {
    setChartData({
      labels: ["test1", "test2", "test3", "test4"],
      datasets: [
        {
          data: [40, 80, 50, 90],
          backgroundColor: ["#FF0000", "#0101DF", "#FF8000", "#F7FE2E"],
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

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
          <option selected>지 역</option>
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
        
      

          <div>
            <Line data={chartData} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoreTotalStatistic;
