import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import UsersTable from '../adminComponents/UsersTable';
const Users = () => {
  return (
    <div>
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <UsersTable />
      </div>
    </div>
  )
}

export default Users