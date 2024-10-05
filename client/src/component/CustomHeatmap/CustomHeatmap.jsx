import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './CustomHeatmap.css'; 

const data = [
  { date: '2024-06-14', count: 1 },
  { date: '2024-07-01', count: 2 },
  { date: '2024-07-04', count: 1 },
  { date: '2024-06-14', count: 1 },
  { date: '2024-07-01', count: 2 },
  { date: '2024-07-04', count: 1 },
  { date: '2024-06-14', count: 1 },
  { date: '2024-07-01', count: 2 },
  { date: '2024-07-03', count: 1 },
];

const CustomHeatmap = () => {
  return (
    <div className="heatmap-container">
      <CalendarHeatmap classname="calender"
        startDate={new Date('2023-10-01')}
        endDate={new Date('2024-09-30')}
        values={data}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default CustomHeatmap;
