import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import AppHeader from '../adminComponents/AdminHeader'
import EmployeesListing from './EmployeesListing'
const EmployeesLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <EmployeesListing />
      </div>
    </div>
  )
}

export default EmployeesLayout