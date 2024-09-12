import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Age from './pages/Age';
import Pay from './pages/Pay';
import Success from './pages/Success';

import './App.css';

function App() {
  const isAdult = () => {
    return localStorage.getItem('isAdult') === 'true';
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/age" element={<Age />} />
        <Route
          path="/"
          element={isAdult() ? <Home /> : <Navigate to="/age" />}
        />
        <Route
          path="/cart"
          element={isAdult() ? <Cart /> : <Navigate to="/age" />}
        />
        <Route
          path="/pagar/:cartId"
          element={isAdult() ? <Pay /> : <Navigate to="/" />}
        />
        <Route
          path="/success"
          element={isAdult() ? <Success /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
