import React,{useState, useEffect} from "react";
import "./RecommendofStore.css";
import axios from "axios";
import { Line } from 'react-chartjs-2'

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
  const [ageSelect, setAgeSelect] = useState("");
  const [genderSelect,setGenderSelect] = useState("");
  const [industrySelect,setIndustrySelect] = useState("");
  const [chartData,setChartData] = useState({})

  const recommendThunk = () => dispatch =>{
    axios.get(`http://localhost:8080/admins/recommend-chart`)
    

  }

  const search = () =>{
    if(startDate>endDate) {alert('시작날짜보다 빠를 수 없습니다.'); setEndDate("")}
  }

  const ageSelectCheck = e =>{
    setAgeSelect(e.target.value)
  }
  const genderSelectCheck = e=>{
    setGenderSelect(e.target.value)
  }
  const industrySelectCheck = e=>{
    setIndustrySelect(e.target.value)
  }

  const chart = () =>{
    setChartData({
      labels:['가맹점1','가맹점2','가맹점3'],
      datasets:[
        {
          data:[11,40,50],
          backgroundColor:[
            '#151515','#848484','#D8D8D8'
          ]
        }
      ]
    })
  }

  useEffect(()=>{
    chart()
  },[])


  return (
    <div>
      <h5>-추천 가맹점 조회</h5>

      <div className="recommendLine">
        <div>
          <h4 className="recommend-data-main-h4">필수입력</h4>
          <h6 className="recommend-data-h6">기간설정 : </h6>
          <input className="recommend-data" type="date" value={startDate} onChange={e => setStartDate(e.target.value)}></input>
          <h4 className="recommend-data-h4"> &nbsp; ~ </h4>
          <input className="recommend-data" type="date" value={endDate} onChange={e => setEndDate(e.target.value)}></input>
          
        </div>
        <br/>
        <br/>
     
        
       
        <div className="option-btn">
        <h4 className="recommend-detail-h4">상세조회</h4>
        <h6 className="recommend-detail-h6">연령대 : </h6>
          <select  id="recommend-select" value={ageSelect} onChange={ageSelectCheck}>
            <option selected>연령대</option>
            <option value="ten">10대</option>
            <option value="twenty">20대</option>
            <option value="thirty">30대</option>
            <option value="forty">40대</option>
            
          </select>
          <h6 className="recommend-detail-h6">성별 : </h6>
          <select  id="recommend-select" value={genderSelect} onChange={genderSelectCheck}>
            <option selected>성별</option>
            <option value="woman">여자</option>
            <option value="man">남자</option>
          </select>
          <h6 className="recommend-detail-h6">업종 : </h6>
          <select  id="recommend-select" value={industrySelect} onChange={industrySelectCheck}>
            <option value="food" selected>음식점</option>
            <option value="clothing">의류업</option>
            <option value="manufacturing">제조업</option>
          </select>
        </div>
        <input  onClick={search} className="recommend-button" type="submit" value="조회" />

       <div>
          <Line data={chartData} />
       </div>

        

      </div>

    </div>
  );
};

export default RecommendofStore;
