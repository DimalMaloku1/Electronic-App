import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = () => {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Sold Products',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: [165, 259, 380, 481, 516,680,897,967]
      },
      
    ]
  };

  // Chart options
  const options = {
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <h2>Sales From January To May 2023 Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StackedBarChart;
