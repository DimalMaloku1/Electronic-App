import React from 'react'

import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import AppHeader from '../adminComponents/AdminHeader';

const Dashboard = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
    </div>
  )
}

export default Dashboard