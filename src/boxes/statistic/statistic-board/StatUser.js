import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./StatUser.css";
import useRegionStatChartData from '../statistic-hooks/useRegionStatChartData'

const StatUser = () => {

  const chartData = useRegionStatChartData();

  return (
    <>
      <div id="doughnutChart">
        <Doughnut data={chartData} />
      </div>
      
    </>
  );
};

export default StatUser;


