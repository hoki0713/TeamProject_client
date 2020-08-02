import React,{useState,useEffect} from 'react';
import './LocalofUsers.css'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

const LOCAL_USERS = "LOCAL_USERS"

export const localUserAction = (data:any)=>({type:LOCAL_USERS, payload:data})

export const localUserReducer = (state=[],action) =>{
  switch(action.type){
    case  LOCAL_USERS : return action.payload
    default : return state;
  }
}

const LocalofUsers = () => {
  const [startDate, setStartDate] =useState("");
  const [endDate, setEndDate] = useState(""); 
  const [keyArr,setKeyArr] = useState([]);
  const [valueArr,setValueArr] = useState([]);
  const [chartData , setChartData] = useState({});
 
  const dispatch = useDispatch()

 


  
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
          ]
        }
      ]
    })
  }

  useEffect(()=>{
   chart()
  },[])




  const startDateClick = e => {
    e.preventDefault()
    setStartDate(e.target.value) 
    }


const endDateClick = e =>{
  setEndDate(e.target.value)
  console.log(endDate)  
}

const chartClick = e=>{
  
}
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

const start_end_date =e =>{
   e.preventDefault() 
   if(startDate>endDate){ alert('시작날짜보다 빠를수 없습니다.'); setEndDate("")}
}


  return (
    <div>
      <h1>사용자 이용 지역</h1>
      <div className="local-div">
      <h6 className="recommend-data-h6">기간설정 : </h6>
      <input className="recommend-data"  min="2020-01-01" type="date" value={startDate} onChange={startDateClick}></input>
      <h4 className="recommend-data-h4"> &nbsp; ~ </h4>
      <input className="recommend-data" min="" type="date" value={endDate} onChange={endDateClick} ></input>
      <input className="recommend-button" type="submit" onClick={start_end_date} value="조회"/>
      </div>

     <div>
       <Doughnut data={chartData}/>
     </div>
    </div>
  );
};

export default LocalofUsers;