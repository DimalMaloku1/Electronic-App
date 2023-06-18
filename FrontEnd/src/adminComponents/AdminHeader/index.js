
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import PfpImg from '../../assets/AdminPfp.png'

function AppHeader() {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwttoken');
  
    // Remove the username from local storage
    localStorage.removeItem('username');
  
    localStorage.removeItem('role');

    // Redirect to the home page
    window.location.href = '/';
  }
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src={PfpImg}></Image>
      <Typography.Title ><div className="admin-title">Admin's Dashboard</div></Typography.Title>
      <button className='inline-flex items-center text-white bg-red-600 border-0 py-2 px-4 focus:outline-none hover:bg-red-300 rounded text-base mt-4 md:mt-0 ml-10' onClick={handleLogout}>
          Logout
        </button>
      <Space>
      </Space>
    </div>
  );
}
export default AppHeader;

