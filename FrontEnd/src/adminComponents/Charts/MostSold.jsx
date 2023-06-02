import React from 'react';
import { Bar } from 'react-chartjs-2';

const MostSold = () => {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'],
   
    datasets: [
      {
        label: 'Apple iPhone 14 Pro',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: [101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        label: 'MacBook Pro 16',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: [0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      // Add more datasets for other products
      {
        label: 'Razer DeathAdder V2',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        data: [0, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        label: 'Apple iPhone 14 Pro',
        backgroundColor: 'rgba(255,205,86,0.2)',
        borderColor: 'rgba(255,205,86,1)',
        borderWidth: 1,
        data: [0, 0, 0, 155, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      // Add more datasets for other products
      {
        label: 'Nikon D3500',
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 250, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        label: 'Apple Watch Series 8',
        backgroundColor: 'rgba(255,159,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 290, 0, 0, 0, 0, 0, 0]
      },
      {
        label: 'MacBook Pro 16',
        backgroundColor: 'rgba(255,34,232,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 210, 0, 0, 0, 0, 0]
      },
      {
        label: 'Alienware 500Hz Gaming Monitor',
        backgroundColor: 'rgba(150,250,250,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0, 0]
      },
      {
        label: 'SteelSeries Arctis 7',
        backgroundColor: 'rgba(11,299,55,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0]
      },
      {
        label: 'Asus Zenbook Pro Duo 14',
        backgroundColor: 'rgba(105,190,44,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0]
      },
      {
        label: 'OnePlus Nord N20 5G',
        backgroundColor: 'rgba(55,100,264,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 0]
      },
      {
        label: 'Samsung Galaxy A54 5G',
        backgroundColor: 'rgba(215,259,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200]
      },
      // Add more datasets for other products
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
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: context => {
            const datasetLabel = data.datasets[context.datasetIndex].label;
            const value = context.parsed.y;
            return `${datasetLabel}: ${value}`;
          }
        }
      }
    },
    // Custom chart logic
    animation: {
      onComplete: context => {
        const chartInstance = context.chart;
        const { datasets } = chartInstance.config.data;

        datasets.forEach((dataset, datasetIndex) => {
          const maxIndex = dataset.data.reduce(
            (maxIndex, currentValue, currentIndex, array) => {
              if (currentValue > array[maxIndex]) {
                return currentIndex;
              } else {
                return maxIndex;
              }
            },
            0
          );

          dataset.data = dataset.data.map((value, index) => {
            if (index === maxIndex) {
              return value;
            } else {
              return null;
            }
          });
        });

        chartInstance.update();
      }
    }
  };

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <h2>Most Sold Product for Each Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MostSold;
