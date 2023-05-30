import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import OrderTable from '../adminComponents/OrdersTable';
import AppHeader from '../adminComponents/AdminHeader'


const Orders = () => {
  return (
    <div>
      <AppHeader/>
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <OrderTable />
      </div>
    </div>
  )
}

export default Orders