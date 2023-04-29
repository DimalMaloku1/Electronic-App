
import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import './Statistics.css'

export function Statistics() {
  return (
    <div className='statistics-container'>
      <>
      <Sidebar />
      <div className="content">
        <div className="box"><h1>Top Users:</h1></div>
        <div className="box"><h1>Total Sales:</h1></div>
        <div className="box"><h1>Total Users:</h1></div>
        <div className="box"><h1>Most Sold Product:</h1></div>

      </div>
     </>
    </div>
  );
}

export default Statistics;
