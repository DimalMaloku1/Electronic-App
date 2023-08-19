import React from 'react'
import PageContent from '../PageContent';
import SideMenu from '../SideMenu';
import ReviewListing from './ReviewListing';
import AppHeader from '../AdminHeader';

const ReviewLayout = () => {
  return (
    <div>
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <ReviewListing />
      </div>
    </div>
  )
}

export default ReviewLayout