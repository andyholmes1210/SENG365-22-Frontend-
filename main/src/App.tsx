import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auctions from "./components/Auctions";
import Login from "./components/Login";
import Auction from "./components/Auction";
import Register from "./components/Register";
import Profile from "./components/Profile";
import MyAuction from "./components/MyAuction";
function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
                <Route path="/" element={<Auctions/>}/>
                <Route path="/auction/:id" element={<Auction/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/myauction" element={<MyAuction/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;