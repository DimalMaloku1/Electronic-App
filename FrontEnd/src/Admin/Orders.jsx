import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import OrderTable from '../adminComponents/OrdersTable';

const Orders = () => {
  return (
    <div>
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <OrderTable />
      </div>
    </div>
  )
}

export default Orders