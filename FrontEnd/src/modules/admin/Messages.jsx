
import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import HomeBanner from '../../components/HomeBanner/HomeBanner';

export function Messages() {
  return (
    <div className='messages-container'>
      <>
      <Sidebar />
      <h1>Messages page</h1>
      <HomeBanner />
    </>
    </div>
  );
}

export default Messages;
