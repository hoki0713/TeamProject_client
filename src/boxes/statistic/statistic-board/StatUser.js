import React from "react";
import { Doughnut, Bar, HorizontalBar, Line, Pie, Polar, Radar } from "react-chartjs-2";
import "./StatUser.css";
import useRegionStatChartData from '../statistic-hooks/useRegionStatChartData'

//https://github.com/jerairrest/react-chartjs-2 참고

const StatUser = () => {

  const chartData = useRegionStatChartData();

  return (
    <>
      <div id="doughnutChart">
        <Doughnut data={chartData} />
      </div>
      <div>
        <Bar data={chartData}/>
      </div>
      <div>
        <HorizontalBar data={chartData}/>
      </div>
      <div>
        <Line data={chartData}/>
      </div>
      <div>
        <Pie data={chartData}/>
      </div>
      <div>
        <Polar data={chartData}/>
      </div>
      <div>
        <Radar data={chartData}/>
      </div>
    </>
  );
};

export default StatUser;


