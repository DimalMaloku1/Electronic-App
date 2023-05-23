import { Space } from "antd";
import "../Admin.css"

import AppHeader from '../adminComponents/AdminHeader'
import PageContent from "../adminComponents/PageContent";
import SideMenu from "../adminComponents/SideMenu";


export function AdminReference() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
     
    </div>
   
  );
}

export default AdminReference;
