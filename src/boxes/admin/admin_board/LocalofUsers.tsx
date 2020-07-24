import React,{useState} from 'react';
import './LocalofUsers.css'

const LocalofUsers = () => {
  const [startDate, setStartDate] =useState("");
  const [endDate, setEndDate] = useState(""); 

  
  const startDateClick = e => {
    e.preventDefault()
    setStartDate(e.target.value)
}

const endDateClick = e =>{
  e.preventDefault()
  setEndDate(e.target.value)
}


  return (
    <div>
      <h1>사용자 이용 지역
      </h1>
      <div className="local-div">
      <h6 className="recommend-data-h6">기간설정 : </h6>
      <input className="recommend-data" type="date" value={startDate} onChange={startDateClick} ></input>
      <h4 className="recommend-data-h4"> &nbsp; ~ </h4>
      <input className="recommend-data" type="date" value={endDate} onChange={endDateClick} ></input>
      <input className="recommend-button" type="submit" value="조회"/>
      </div>

      <img className="local-img" src="https://support.content.office.net/ko-kr/media/bc64f210-3fc7-4bea-a34b-4557f8547177.jpg" alt=""/>
    </div>
  );
};

export default LocalofUsers;