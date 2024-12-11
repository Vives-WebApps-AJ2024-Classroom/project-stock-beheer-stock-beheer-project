import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Orders from './components/order';
import PlaceOrder from './components/placeorder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
