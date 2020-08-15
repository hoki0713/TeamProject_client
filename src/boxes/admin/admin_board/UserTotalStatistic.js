import React, { useState, useEffect } from "react";
import "./UserTotalStatistic.css";
import axios from "axios";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { useDispatch } from "react-redux";

const RECOMMEND_STORE = "RECOMMEND_STORE";

export const userTotalAction = (data) => ({
  type: RECOMMEND_STORE,
  payload: data,
});

export const userTotaldReducer = (state = [], action) => {
  switch (action.type) {
    case RECOMMEND_STORE:
      return action.payload;
    default:
      return state;
  }
};

const UserTotalStatistic = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [localSelect, setLocalSelect] = useState("");
  const [chartData, setChartData] = useState({});
  const [genderChartData, setGenderChartData] = useState({});
  const [ageChartData, setAgeChartData] = useState({});
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [genderKeys, setGenderKeys] = useState([]);
  const [genderValues, setGenderValues] = useState([]);
  const [ageKeys, setAgeKeys] = useState([]);
  const [ageValues, setAgeValues] = useState([]);

  const dispatch = useDispatch();

  const color = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const userAgeThunk = (localSelect) => (dispatch) => {
    axios
      .get(`http://localhost:8080/admins/userTotal-chart/${localSelect}`)
      .then((res) => {
        console.log(res.data.age);
        const genderValues = [];
        const getnderKeys = [];
        const ageKeys = [];
        const ageValues = [];
        Object.entries(res.data.gender).forEach(([key, value]) => {
          getnderKeys.push(key);
          genderValues.push(value);
        });
        Object.entries(res.data.age).forEach(([key, value]) => {
          ageKeys.push(key);
          ageValues.push(value);
        });
        setGenderKeys(getnderKeys);
        setGenderValues(genderValues);
        setAgeKeys(ageKeys);
        setAgeValues(ageValues);
      })
      .catch((err) => {
        throw err;
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/admins/userTotal-chart/${"null"}`)
      .then((res) => {
        console.log(res.data.age);
        const genderValues = [];
        const getnderKeys = [];
        const ageKeys = [];
        const ageValues = [];
        Object.entries(res.data.gender).forEach(([key, value]) => {
          getnderKeys.push(key);
          genderValues.push(value);
        });
        Object.entries(res.data.age).forEach(([key, value]) => {
          ageKeys.push(key);
          ageValues.push(value);
        });
        setGenderKeys(getnderKeys);
        setGenderValues(genderValues);
        setAgeKeys(ageKeys);
        setAgeValues(ageValues);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    if (localSelect !== "") {
      dispatch(userAgeThunk(localSelect));
    }
    axios
      .get(`http://localhost:8080/admins/chart/ratio-of-user-region`)
      .then((res) => {
        const values = [];
        const keys = [];
        Object.entries(res.data).forEach(([key, value]) => {
          keys.push(key);
          values.push(value);
        });
        setKeys(keys);
        setValues(values);
      })
      .catch((err) => {
        throw err;
      });
  }, [localSelect]);

  useEffect(() => {
    setChartData({
      labels: keys,
      datasets: [
        {
          label: "Locals",
          data: values,
          backgroundColor: keys.map((key) => color()),
        },
      ],
    });

    setGenderChartData({
      labels: genderKeys,
      datasets: [
        {
          label: "",
          data: genderValues,
          backgroundColor: ["rgb(051,051,255,0.5)", "rgb(153,153,255,0.5)"],
        },
      ],
    });
    setAgeChartData({
      labels: ageKeys,
      datasets: [
        {
          label: "Age",
          data: ageValues,
          backgroundColor: "rgb(000,051,255,0.5)",
        },
      ],
    });
  }, [genderKeys, genderValues, keys, values, ageKeys, ageValues, localSelect]);

  const joinDateThunk = ({ startDate, endDate }) => (dispatch) => {
    axios
      .get(
        `http://localhost:8080/admins/joinDate-chart/${startDate}/${endDate}`
      )
      .then((res) => {
        dispatch(userTotalAction(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const start_end_date = (e) => {
    e.preventDefault();
    if (startDate > endDate) {
      alert("시작날짜보다 빠를수 없습니다.");
      setEndDate("");
    }
    dispatch(joinDateThunk({ startDate, endDate }));

    let day = startDate.split("-");
    console.log(day[1]);
  };

  return (
    <div>
      <h1>-회원 통계</h1>

      <div className="userLocal-Total">
        <h5 className="font-weight-bold">전체 지역</h5>
        <Bar data={chartData} />
      </div>
      <div className="parent">
        <h5 className="LocalTotal-h5 font-weight-bold">지역 선택 :</h5>
        <select
          className="form-control"
          id="userLocal-select"
          value={localSelect}
          onChange={(e) => setLocalSelect(e.target.value)}
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
        <div className="userTotal-div">
          <h5 className="font-weight-bold mr-2 option-name">기간 설정 :</h5>
          <input
            className="userTotal-data form-control"
            min="2020-01-01"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <h5 className="font-weight-bold mr-2 ml-2"> ~ </h5>
          <input
            min=""
            type="date"
            className="userTotal-data form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            className="userTotal-button btn btn-outline-primary"
            type="submit"
            onClick={start_end_date}
            value="조회"
          />
        </div>
      </div>
      <div id="graph-container">
        <div className="localTotal-genderDoughnut">
          <h6 className="LocalTotal-h6 font-weight-bold">성별</h6>
          <Doughnut
            data={genderChartData}
            width={100}
            height={100}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="localTotal-ageBar">
          <h6 className="LocalTotal-h6 font-weight-bold">나이</h6>
          <Line
            data={ageChartData}
            width={100}
            height={100}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="userJoin-chart">
        <h6 className="LocalTotalJoin-h6 font-weight-bold">가입일</h6>
        <Line
          data={genderChartData}
          options={{
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default UserTotalStatistic;
