import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import CategoryTable from '../adminComponents/CategoryTable';
import AppHeader from '../adminComponents/AdminHeader'

const Categories = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <CategoryTable />
      </div>
    </div>
  )
}

export default Categories