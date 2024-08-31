import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Age from './pages/Age';
import Pay from './pages/Pay';

import './App.css';

function App() {
  const isAdult = () => {
    return localStorage.getItem('isAdult') === 'true';
  };

  // Nueva función para verificar si el usuario ha completado el proceso de compra
  const hasCompletedPurchase = () => {
    const purchaseData = localStorage.getItem('purchaseData');
    return purchaseData !== null && purchaseData !== undefined;
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
        {/* Añade la ruta /pagar y verifica que el usuario haya completado la compra */}
        <Route
          path="/pagar"
          element={
            isAdult() && hasCompletedPurchase() ? <Pay /> : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
