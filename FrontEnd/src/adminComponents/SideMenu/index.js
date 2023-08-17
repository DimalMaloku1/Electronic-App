
import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    MessageOutlined,
    LogoutOutlined,
    DropboxOutlined
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  
  function SideMenu() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
  
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashbaord",
              icon: <AppstoreOutlined />,
              key: "/dashboard",
            },
            {
              label: "Admin Products",
              key: "/adminproducts",
              icon: <ShopOutlined />,
            },
            {
              label: "Orders",
              key: "/orders",
              icon: <ShoppingCartOutlined />,
            },
            {
              label: "Users",
              key: "/users",
              icon: <UserOutlined />,
            },
          
            {
              label: "Messages",
              key: "/messages",
              icon: <MessageOutlined />,
            },
            {
              label: "Categories",
              key: "/categories",
              icon:<DropboxOutlined />,
            },
            {
              label: "Lab2 Adresses",
              key: "/adresseslisting",
              icon:<DropboxOutlined />,
            },
            {
              label: "Lab2 Customers",
              key: "/customerlisting",
              icon:<DropboxOutlined />,
            },
            
          ]}
          
        ></Menu>
      </div>
    );
  }
  export default SideMenu;
