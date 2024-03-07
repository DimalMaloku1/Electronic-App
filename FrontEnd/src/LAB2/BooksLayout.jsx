import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import BooksListing from './BooksListing';
import AppHeader from '../adminComponents/AdminHeader'

const BooksLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <BooksListing />
      </div>
    </div>
  )
}

export default BooksLayout