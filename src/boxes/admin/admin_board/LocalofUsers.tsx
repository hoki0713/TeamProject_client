import React,{useState,useEffect} from 'react';
import './LocalofUsers.css'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { Doughnut,Line } from 'react-chartjs-2';

const LOCAL_USERS = "LOCAL_USERS"

export const localUserAction = (data:any)=>({type:LOCAL_USERS, payload:data})

export const localUserReducer = (state=[],action) =>{
  switch(action.type){
    case  LOCAL_USERS : return action.payload
    default : return state;
  }
}

const LocalofUsers = () => {

  const [valueArr,setValueArr] = useState([]);
  const [chartData , setChartData] = useState({});
  const [localSelect,setLocalSelect] = useState("");
  const [industrySelect,setIndustrySelect] =useState("")

 
  const dispatch = useDispatch()

 const localSelectCheck = e =>{
    e.preventDefault()
    setLocalSelect(e.target.value)
  }

  const industrySelectCheck = e=>{
    e.preventDefault()
    setIndustrySelect(e.target.value)
  }


  
  useEffect(()=>{
   
    axios.get(`http://localhost:8080/admins/chart/ratio-of-user-region`)
    .then((res)=>{})
    .catch((err)=>{
      throw err;
    })
  },[])
  
  console.log(valueArr)

  const chart = ()=>{
    setChartData({
      labels:['test1','test2','test3','test4'],
      datasets:[
        {
          data:[40,80,50,90],
          backgroundColor:[
            '#FF0000','#0101DF','#FF8000','#F7FE2E'
          ],
          
        }
      ]
    })
  }

  useEffect(()=>{
   chart()
  },[])



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

      <div className="storeTotal-div">
        <h5 className="storeTotal-h5 font-weight-bold">지역별로 가맹점</h5>
        <h6 className="storeTotal-h6">-지역별로 가맹점 등록수 통계</h6>
      </div>
      <select  id="storeTotal-select-local" value={localSelect} onChange={localSelectCheck}>
            <option selected>지역별</option>
            <option value="koyang">고양시</option>
            <option value="uijeongbu">의정부시</option> 
          </select>

     <div className="storeTotalLocal-Line">
       <Line data={chartData}/>
     </div>

     <div className="storeTotal-div">
        <h5 className="storeTotal-h5 font-weight-bold">업종별로 가맹점</h5>
        <h6 className="storeTotal-h6">-업종별로 가맹점 등록수 통계</h6>
      </div>
      <select  id="storeTotal-select-local" value={industrySelect} onChange={industrySelectCheck}>
            <option selected>업종별</option>
            <option value="koyang">음식업</option>
            <option value="uijeongbu">의류업</option> 
            <option value="uijeongbu">가구업</option> 
          </select>

     <div className="storeTotalLocal-Line">
       <Line data={chartData}/>
     </div>
    </div>
  );
};

export default LocalofUsers;