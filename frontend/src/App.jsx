import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Age from './pages/Age';

import './App.css';

function App() {
  // Función para verificar si el usuario ha pasado la validación de edad
  const isAdult = () => {
    return localStorage.getItem('isAdult') === 'true';
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/age" element={<Age />} />
        {/* Rutas protegidas */}
        <Route
          path="/"
          element={isAdult() ? <Home /> : <Navigate to="/age" />}
        />
        <Route
          path="/cart"
          element={isAdult() ? <Cart /> : <Navigate to="/age" />}
        />
      </Routes>
    </div>
  );
}

export default App;
