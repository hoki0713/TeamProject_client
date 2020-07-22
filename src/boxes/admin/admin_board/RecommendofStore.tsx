import React from "react";
import "./RecommendofStore.css";


const RecommendofStore = () => {
  const search = () =>{
    alert(`추천가맹점 조회 클릭`)
  }

  return (
    <div>
      <h5>-추천 가맹점 조회</h5>

      <div className="recommendLine">
        <div>
          <h4 className="recommend-data-main-h4">필수입력</h4>
          <h6 className="recommend-data-h6">기간설정 : </h6>
          <input className="recommend-data" type="date"></input>
          <h4 className="recommend-data-h4"> &nbsp; ~ </h4>
          <input className="recommend-data" type="date"></input>
          
        </div>
        <br/>
        <br/>


        
       
        <div className="option-btn">
        <h4 className="recommend-detail-h4">상세조회</h4>
        <h6 className="recommend-detail-h6">연령대 : </h6>
          <select  id="recommend-select">
            <option selected>연령대</option>
            <option>10대</option>
            <option>20대</option>
            <option>30대</option>
            <option>40대</option>
            <option>50대</option>
          </select>
          <h6 className="recommend-detail-h6">성별 : </h6>
          <select  id="recommend-select">
            <option selected>성별</option>
            <option>여자</option>
            <option>남자</option>
          </select>
          <h6 className="recommend-detail-h6">업종 : </h6>
          <select  id="recommend-select">
            <option selected>음식점</option>
            <option>의류업</option>
            <option>제조업</option>
          </select>
        </div>

        <input  onClick={search} className="recommend-button" type="submit" value="조회" />

       <div>
         <img className="recommend-chart" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/SampleBurndownChart.svg/330px-SampleBurndownChart.svg.png" alt=""/>
       </div>

        

      </div>

    </div>
  );
};

export default RecommendofStore;
