import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';

// Lazy loading de tus componentes
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Age = lazy(() => import('./pages/Age'));
const Pay = lazy(() => import('./pages/Pay'));
const Success = lazy(() => import('./pages/Success'));

function App() {
  const isAdult = () => {
    return localStorage.getItem('isAdult') === 'true';
  };

  return (
    <div className="app-container">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
