import React,{useState, useEffect} from "react";
import "./RecommendofStore.css";
import axios from "axios";
import { Line, Bar, Doughnut } from 'react-chartjs-2'

const RECOMMEND_STORE ="RECOMMEND_STORE"

export const recommendAction = data =>({type:RECOMMEND_STORE,payload:data})

export const recommendReducer = (state=[],action) => {
  switch(action.type){
    case RECOMMEND_STORE : return action.payload
  }
}

const RecommendofStore = () => {

  const [startDate, setStartDate] =useState("");
  const [endDate, setEndDate] = useState("");
  const [localSelect, setLocalSelect] = useState("");
  const [chartData,setChartData] = useState({})
  const [genderChartData,setGenderChartData] = useState({})

  const recommendThunk = () => dispatch =>{
    axios.get(`http://localhost:8080/admins/recommend-chart`)
    

  }

  const search = () =>{
    if(startDate>endDate) {alert('시작날짜보다 빠를 수 없습니다.'); setEndDate("")}
  }

  const startDateClick = e =>{
    e.preventDefault()
    setStartDate(e.target.value)
  }

  const endDateClick = e =>{
    e.preventDefault()
    setEndDate(e.target.value)
  }

  const start_end_date = e=>{
    e.preventDefault()
    if(startDate>endDate){ alert('시작날짜보다 빠를수 없습니다.'); setEndDate("")}
  }

  const localSelectCheck = e =>{
    setLocalSelect(e.target.value)
  }


  const chart = () =>{
    setChartData({
      labels:['가맹점1','가맹점2','가맹점3'],
      datasets:[
        {
          data:[11,40,50],
          backgroundColor:[
            '#151515','#848484','#D8D8D8'
          ],
          lineTension: 0
        }
      ]
    })
    setGenderChartData({
      labels:['남','여'],
      datasets:[
        {
          data:[40,60],
          backgroundColor:['rgb(051,051,051,5)']
          
        }
      ]
    })
  }

 
  useEffect(()=>{
    chart()
  },[])


  return (
    <div>
      <h1>-회원 통계</h1>

      <div className="userLocal-Total">
        <h5 className="font-weight-bold">전체 지역</h5>
        <Bar data={chartData}/>
      </div>
    <div className="parent">
      <div>
      <h5 className="LocalTotal-h5 font-weight-bold">기준 :</h5>
      <select  id="userLocal-select" value={localSelect} onChange={localSelectCheck}>
            <option selected>지역별</option>
            <option value="koyang">고양시</option>
            <option value="uijeongbu">의정부시</option> 
          </select>
          </div>
          <div className="localTotal-genderDoughnut">
            <h6 className="LocalTotal-h6 font-weight-bold">성별</h6>
            <Doughnut data={genderChartData}/>
          </div>
      

      <div className="localTotal-ageBar">
      <h6 className="LocalTotal-h6 font-weight-bold">나이</h6>
        <Bar data={chartData}/>
      </div>
      </div>

      
        <div className="userTotal-div">
        <h5 className="userTotal-data font-weight-bold">기준(기간설정) : &nbsp;</h5>
        <input className="userTotal-data"  min="2020-01-01" type="date" value={startDate} onChange={startDateClick}></input>
        <h4 className="userTotal-data"> &nbsp; ~  &nbsp; </h4>
        <input  min="" type="date" value={endDate} onChange={endDateClick} ></input>
        <input className="userTotal-button btn btn-outline-primary" type="submit" onClick={start_end_date} value="조회"/>
        </div>

        <div className="userJoin-chart">
        <h6 className="LocalTotalJoin-h6 font-weight-bold">가입일</h6>
          <Line data={chartData} options={{
            responsive:true,

          }}/>
        </div>
     


     
    </div>
  );
};

export default RecommendofStore;
