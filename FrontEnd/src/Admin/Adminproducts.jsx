import React from 'react'

import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import ProductsListing from './ProductsListing';
import AppHeader from '../adminComponents/AdminHeader'


import './Products.css'

const Adminproducts = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <ProductsListing />
      </div>
    </div>
  )
}

export default Adminproducts