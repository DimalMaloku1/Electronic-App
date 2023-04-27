import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import {Shop} from './pages/Shop'
import {Cart} from './pages/Cart'
import {Wishlist} from './pages/Wishlist'
import {Signup} from './pages/Signup'
import {Contact} from './pages/Contact'
import {Dashboard} from '../src/pages/admin/Dashboard'
import {Statistics} from '../src/pages/admin/Statistics'
import {Users} from '../src/pages/admin/Users'
import {Adminproducts} from "./pages/admin/Adminproducts";
import {Categories} from "./pages/admin/Categories";
import {Orders} from "./pages/admin/Orders";
import {Messages} from "./pages/admin/Messages";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />         

        <Routes>
          <Route path="/" element={<Shop />}/>
          <Route path="cart"  element={<Cart />}/>
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="signup" element={<Signup />} />
          <Route path="contact" element={<Contact />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="statistics" element={<Statistics />}/>
          <Route path="users"  element={<Users />}/>
          <Route path="adminproducts"  element={<Adminproducts />}/>
          <Route path="categories"  element={<Categories />}/>
          <Route path="orders"  element={<Orders />}/>
          <Route path="messages"  element={<Messages />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
