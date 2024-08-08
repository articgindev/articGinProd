import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
