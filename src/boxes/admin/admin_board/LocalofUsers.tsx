import React,{useState,useEffect, useCallback} from 'react';
import './LocalofUsers.css'


const LocalofUsers = () => {
  const [startDate, setStartDate] =useState("");
  const [endDate, setEndDate] = useState(""); 

  // useEffect(() => {
  //   if(startDate === "") setStartDate(Date)
  //   if(endDate === "") setEndDate(Date)
  // })

  const startDateClick = e => {
    e.preventDefault()
    setStartDate(e.target.value) 
    }


const endDateClick = e =>{
  //  if(endDate === ""){
  //     setEndDate(startDate)
  // }

  

  setEndDate(e.target.value)
  console.log(endDate)  
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
      <h1>사용자 이용 지역
      </h1>
      <h3>시작:{startDate}</h3>
      <h3>종료:{endDate}</h3>
      <div className="local-div">
      <h6 className="recommend-data-h6">기간설정 : </h6>
      <input className="recommend-data"  min="2020-01-01" type="date" value={startDate} onChange={startDateClick}></input>
      <h4 className="recommend-data-h4"> &nbsp; ~ </h4>
      <input className="recommend-data" min="" type="date" value={endDate} onChange={endDateClick} ></input>
      <input className="recommend-button" type="submit" onClick={start_end_date} value="조회"/>
      </div>

      <img className="local-img" src="https://support.content.office.net/ko-kr/media/bc64f210-3fc7-4bea-a34b-4557f8547177.jpg" alt=""/>
    </div>
  );
};

export default LocalofUsers;