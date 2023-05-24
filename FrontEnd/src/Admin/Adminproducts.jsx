import React from 'react'

import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import ProductsListing from './ProductsListing';
const Adminproducts = () => {
  return (
    <div>
      
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <ProductsListing />
      </div>
    </div>
  )
}

export default Adminproducts