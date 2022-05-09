import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auctions from "./components/Auctions";
import Login from "./components/Login";
import Auction from "./components/Auction";
import Navbar from "./components/Navbar/NavbarDefault";
import Register from "./components/Register";
function App() {
  return (
      <div className="App" style={{
          backgroundColor: "#4A7CB5"}}>
        <Router>
            <Navbar/>
          <div>
            <Routes>
                <Route path="/" element={<Auctions/>}/>
                <Route path="/auction/:id" element={<Auction/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;