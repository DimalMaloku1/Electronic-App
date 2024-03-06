import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import TeamListing from './TeamsListing';
import AppHeader from '../adminComponents/AdminHeader'

const AdressesLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <TeamListing />
      </div>
    </div>
  )
}

export default AdressesLayout