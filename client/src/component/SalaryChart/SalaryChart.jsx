import React from 'react';
import {LineChart,Line,XAxis, YAxis,CartesianGrid,Tooltip} from 'recharts';
import "./SalaryChart.css";
const data = [
  { name: 'Sep 2023', uv: 0 },
  { name: 'Nov 2023', uv: 2 },
  { name: 'Jan 2024', uv: 7 },
  { name: 'Mar 2024', uv: 3 },
  { name: 'May 2024', uv: 5 },
  { name: 'Jul 2024', uv: 1 },
  { name: 'Sep 2024', uv: 6 },
];

const SalaryChart = () => {
  return (
    <div>
      <div className='chart-left'>
        <div className='chart-content'>Outgoing Salary</div>
        <div className="chart-text">Đã đồng bộ hóa</div>
      </div>
      <LineChart width={1000} height={250} data={data} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip 
 />
      <Line type="monotone" dataKey="uv"  
 stroke="#f08080" />
    </LineChart>
    </div>
    
  );
};

export default SalaryChart;
