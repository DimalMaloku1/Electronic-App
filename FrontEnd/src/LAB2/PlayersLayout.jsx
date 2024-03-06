import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import PlayersListing from './PlayersListing';
import AppHeader from '../adminComponents/AdminHeader'

const AdressesLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <PlayersListing />
      </div>
    </div>
  )
}

export default AdressesLayout