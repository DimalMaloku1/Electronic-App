import { BrowserRouter, Route, Routes } from "react-router-dom";
import Adminproducts from '../../Admin/Adminproducts'
import Categories from '../../Admin/Categories'
import Dashboard from '../../Admin/Dashboard'
import Messages from '../../Admin/Messages'
import Orders from '../../Admin/Orders'
import Users from '../../Admin/Users'
import AdminReference from '../../Admin/AdminReference'
function AppRoutes() {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/adminreference" element={<AdminReference/>} />
        <Route path="/adminproducts" element={<Adminproducts/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/users" element={<Users/>} />

    </Routes>
  );
}
export default AppRoutes;

