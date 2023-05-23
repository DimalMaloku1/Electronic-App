
import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import './Statistics.css'
import AppHeader from '../../adminComponents/AdminHeader';

export function Dashboard() {
  return (
    <div className='statistics-container'>
      <>
      <AppHeader />
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

export default Dashboard;
