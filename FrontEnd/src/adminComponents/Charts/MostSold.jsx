import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const MostSold = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7099/api/Checkout');
        const data = await response.json();
        const productQuantities = {};
        data.forEach(entry => {
          entry.products.forEach(product => {
            productQuantities[product.name] = (productQuantities[product.name] || 0) + product.quantity;
          });
        });
        const mostSoldProducts = Object.keys(productQuantities).map(name => ({
          name,
          quantity: productQuantities[name]
        }));
        setProductData(mostSoldProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!productData.length || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext('2d');

    const labels = productData.map(product => product.name);
    const data = productData.map(product => product.quantity);

    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(123, 200, 87)',
            'rgb(180, 78, 200)',
            'rgb(78, 156, 200)',
            // Add more colors as needed
          ],
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index];
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `${label}: ${value} sold`;
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [productData]);

  return (
    <div>
      <h1>Most sold products</h1>
      <canvas ref={chartRef} style={{ width: '350px', height: '250px' }} />
    </div>
  );
};

export default MostSold;
