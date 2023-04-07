import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import {Shop} from './pages/Shop'
import {Cart} from './pages/Cart'
import {Wishlist} from './pages/Wishlist'
import {Signup} from './pages/Signup'
import {Contact} from './pages/Contact'

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
