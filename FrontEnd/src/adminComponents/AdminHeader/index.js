
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import PfpImg from '../../assets/AdminPfp.png'

function AppHeader() {
  
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src={PfpImg}></Image>
      <Typography.Title ><div className="admin-title">Admin's Dashboard</div></Typography.Title>
      <Space>
      </Space>
    </div>
  );
}
export default AppHeader;

