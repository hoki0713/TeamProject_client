import { useState, useEffect } from "react";
import axios from "axios";

export default function useRegionStatChartData() {
  const [keyArr, setKeyArr] = useState([]);
  const [valueArr, setValueArr] = useState([]);
  const [chartData, setChartData] = useState({});

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/statistics`)
      .then((response) => {
        const values = [];
        const keys = [];
        Object.entries(response.data).forEach(([key, value]) => {
          keys.push(key);
          values.push(value);
        });
        setKeyArr(keys);
        setValueArr(values);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  useEffect(() => {
    setChartData({
      labels: keyArr,
      datasets: [
        {
          data: valueArr,
          backgroundColor: keyArr.map((key) => getRandomColor()),
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    });
  }, [keyArr, valueArr]);

  return chartData;
};
