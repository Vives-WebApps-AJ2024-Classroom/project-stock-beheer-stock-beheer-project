import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/login';
import Orders from './components/order';
import PlaceOrder from './components/placeorder';

function Navbar() {
  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li><Link to="/" style={linkStyle}>Login</Link></li>
        <li><Link to="/order" style={linkStyle}>Orders</Link></li>
        <li><Link to="/place-order" style={linkStyle}>Place Order</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>
    </Router>
  );
}

const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px'
};

const navListStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  padding: 0
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px'
};

export default App;