import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import AdressesListing from './AdressesListing';
import AppHeader from '../adminComponents/AdminHeader'
import EmployeesDetailsListing from './EmployeeDetailsListing'
const EmployeesDetailsLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <EmployeesDetailsListing />
      </div>
    </div>
  )
}

export default EmployeesDetailsLayout