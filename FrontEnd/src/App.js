import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './modules/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './modules/Product';
import Products from './modules/Products';
import CategoryProducts from './modules/CategoryProducts';
import Cart from './modules/Cart';
import WishList from './modules/WishList/WishList';
import AboutUs from './modules/AboutUs/AboutUs';
import Contact from './modules/Contact/Contact';
import Login from './modules/LoginRegister/Login'
import Register from './modules/LoginRegister/Register'
import UserPage from './modules/UserAccount';
import Checkoutsuccess from './components/Checkoutsuccess';

// Admin Navigation from here
import Adminproducts from './Admin/Adminproducts'
import Categories from './Admin/Categories'
import Dashboard from './Admin/Dashboard'
import Messages from './Admin/Messages'
import Orders from './Admin/Orders'
import Users from './Admin/Users'
import AdminReference from './Admin/AdminReference'
import ProductsListing from './Admin/ProductsListing';
import ProductsEdit from './Admin/ProductsEdit';
import ProductsCreate from './Admin/ProductsCreate';
import CategoryTable from './adminComponents/CategoryTable';
import CategoriesCreate from './Admin/CategoriesCreate'
import CategoriesEdit from './Admin/CategoriesEdit'

//LAB Crud
import AdressesCreate from './CrudLab/AdressesCreate'
import AdressesEdit from './CrudLab/AdressesEdit'
import AdressesListing from './CrudLab/AdressesListing'
import CustomerListing from './CrudLab/CustomerListing';
import CustomerEdit from './CrudLab/CustomerEdit';
import CustomerCreate from './CrudLab/CustomerCreate';
import CustomerLayout from './CrudLab/CustomerLayout'
import AdressesLayout from './CrudLab/AddressLayout';
import ReviewLayout from './adminComponents/AdminReview/ReviewLayout';
import ReviewListing from './adminComponents/AdminReview/ReviewListing';
import EmployeesListing from './CrudLab/EmployeesListing';
import EmployeesCreate from './CrudLab/EmployeesCreate';
import EmployeesEdit from './CrudLab/EmployeesEdit';
import EmployeeDetailsListing from './CrudLab/EmployeeDetailsListing';
import EmployeeDetailsCreate from './CrudLab/EmployeeDetailsCreate';
import EmployeeDetailsEdit from './CrudLab/EmployeeDetailsEdit';

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:id" element={<Product/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/categories/:name" element={<CategoryProducts/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="/wishlist" element={<WishList/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/userpage" element = {<UserPage/>} />

        
        <Route path="/adminreference" element={<AdminReference/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/adminproducts" element={<Adminproducts/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/users" element={<Users/>} />
        <Route path='/checkoutsuccess' element={<Checkoutsuccess />}/>

        <Route path='/productslisting' element={<ProductsListing />}></Route>
        <Route path='/products/create' element={<ProductsCreate />}></Route>
        <Route path='/products/edit/:productsid' element={<ProductsEdit />}></Route>

        <Route path='/categories' element={<CategoryTable />}></Route>
        <Route path='/categories/create' element={<CategoriesCreate />}></Route>
        <Route path='/categories/edit/:categoriesid' element={<CategoriesEdit />}></Route>

        <Route path='/adresseslayout' element={<AdressesLayout/>}></Route>
        <Route path='/adresseslisting' element={<AdressesListing />}></Route>
        <Route path='/adresses/create' element={<AdressesCreate />}></Route>
        <Route path='/adresses/edit/:adressesid' element={<AdressesEdit />}></Route>
        
        <Route path='/customerlayout' element={<CustomerLayout/>}></Route>
        <Route path='/customerlisting' element={<CustomerListing/>}></Route>
        <Route path='/customer/create' element={<CustomerCreate />}></Route>
        <Route path='/customer/edit/:customerid' element={<CustomerEdit />}></Route>

        <Route path='/employeeslisting' element={<EmployeesListing/>}></Route>
        <Route path='/employees/create' element={<EmployeesCreate/>}></Route>
        <Route path="/employees/edit/:employeesId" element={<EmployeesEdit />} />

        <Route path='/employeedetails/create' element={<EmployeeDetailsCreate/>}></Route>
        <Route path='/employeedetailslisting' element={<EmployeeDetailsListing/>}></Route>
        <Route path="/employeedetails/edit/:employeedetailsId" element={<EmployeeDetailsEdit/>} />
        

        <Route path='/reviewslayout' element={<ReviewLayout/>}></Route>
        <Route path='/reviewslisting' element={<ReviewListing/>}></Route>

        <Route path="*" element={<div>404</div>} />

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
