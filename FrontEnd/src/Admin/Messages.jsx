import React from 'react'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";
import MessageTable from '../adminComponents/MessagesTable';
const Messages = () => {
  return (
    <div>
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <MessageTable />
      </div>
    </div>
  )
}

export default Messages