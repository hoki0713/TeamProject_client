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

 //const result = useSelector(x:)


  
  useEffect(()=>{
    const valuelist=[]
    axios.get(`http://localhost:8080/admins/chart/ratio-of-user-region`)
    .then((res)=>{
      //setValueArr(res.data)
      //console.log(valueArr)
      //dispatch(localUserAction(res.data))
      // res.data.forEach(item=>{valuelist.push({
          
      // })})
      // const values = [];
      // const keys =[]
      // Object.entries(res.data).forEach(([key,value])=>{
        
      // })
    
    })
    .catch((err)=>{
      throw err;
    })
  },[])
  
  console.log(valueArr)

  useEffect(()=>{
    setChartData({
      labels:['a','b','c'],
      datasets:[
        {
            data:[valueArr[0],valueArr[1],valueArr[2]]
        }
      ]
    })
  })


  // useEffect(() => {
  //   if(startDate === "") setStartDate(Date)
  //   if(endDate === "") setEndDate(Date)
  // })

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

     {/* <button onClick={localUserThunk}>aaaa</button> */}
     <div>
       <Doughnut data={chartData}/>
     </div>
    </div>
  );
};

export default LocalofUsers;