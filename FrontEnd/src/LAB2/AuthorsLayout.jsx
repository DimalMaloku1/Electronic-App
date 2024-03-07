import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import AuthorsListing from './AuthorsListing';
import AppHeader from '../adminComponents/AdminHeader'

const AuthorsLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <AuthorsListing />
      </div>
    </div>
  )
}

export default AuthorsLayout