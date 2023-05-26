import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import CategoryTable from '../adminComponents/CategoryTable';
const Categories = () => {
  return (
    <div>
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <CategoryTable />
      </div>
    </div>
  )
}

export default Categories