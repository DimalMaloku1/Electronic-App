import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="cart" />
          <Route path="wishlist" />
          <Route path="signup" />
          <Route path="contact" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
