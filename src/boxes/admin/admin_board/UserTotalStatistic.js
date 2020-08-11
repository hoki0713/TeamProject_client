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
        { label:"Age",
          data: ageValues,
          backgroundColor:'rgb(000,051,255,0.5)'
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

  const startDateClick = (e) => {
    e.preventDefault();
    setStartDate(e.target.value);
  };

  const endDateClick = (e) => {
    e.preventDefault();
    setEndDate(e.target.value);
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

  const localSelectCheck = (e) => {
    e.preventDefault();
    setLocalSelect(e.target.value);
  };

  return (
    <div>
      <h1>-회원 통계</h1>

      <div className="userLocal-Total">
        <h5 className="font-weight-bold">전체 지역</h5>
        <Bar data={chartData} />
      </div>
      <div className="parent">
        <div>
          <h5 className="LocalTotal-h5 font-weight-bold">기준 :</h5>
          <select
            id="userLocal-select"
            value={localSelect}
            onChange={localSelectCheck}
          >
            <option selected>지역선택</option>
            <option value="고양">고양시</option>
            <option value="의정부">의정부시</option>
            <option value="부천">부천시</option>
            <option value="양평">양평시</option>
            <option value="시흥">시흥시</option>
            <option value="광명">광명시</option>
            <option value="화성">화성시</option>
            <option value="김포">김포시</option>
            <option value="수원">수원시</option>
            <option value="평택">평택시</option>
            <option value="안산">안산시</option>
            <option value="군포">군포</option>
            <option value="동두천">동두천시</option>
            <option value="하남">하남시</option>
            <option value="가평">가평시</option>
            <option value="용인">용인시</option>
            <option value="여주">여주시</option>
          </select>
        </div>
        <div className="localTotal-genderDoughnut">
          <h6 className="LocalTotal-h6 font-weight-bold">성별</h6>
          <Doughnut data={genderChartData} />
        </div>

        <div className="localTotal-ageBar">
          <h6 className="LocalTotal-h6 font-weight-bold">나이</h6>
          <Line data={ageChartData} />
        </div>
      </div>

      <div className="userTotal-div">
        <h5 className="userTotal-data font-weight-bold">
          기준(기간설정) : &nbsp;
        </h5>
        <input
          className="userTotal-data"
          min="2020-01-01"
          type="date"
          value={startDate}
          onChange={startDateClick}
        ></input>
        <h4 className="userTotal-data"> &nbsp; ~ &nbsp; </h4>
        <input
          min=""
          type="date"
          value={endDate}
          onChange={endDateClick}
        ></input>
        <input
          className="userTotal-button btn btn-outline-primary"
          type="submit"
          onClick={start_end_date}
          value="조회"
        />
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
