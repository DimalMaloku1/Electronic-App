import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import AdressesListing from './AdressesListing';
import AppHeader from '../adminComponents/AdminHeader'

const AdressesLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <AdressesListing />
      </div>
    </div>
  )
}

export default AdressesLayout