import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function StackedBarChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7099/api/Account');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // If userData is not yet available, do nothing
    if (!userData.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext('2d');

    // Count the number of users in each role
    const roleCounts = userData.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: Object.keys(roleCounts),
        datasets: [
          {
            data: Object.values(roleCounts),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [userData]);

  return (
    <div>
      <h1>Percentage of customers by role </h1>
      <canvas ref={chartRef} style={{ width: '350px', height: '250px' }} />
    </div>
  );
}