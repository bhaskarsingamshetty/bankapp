import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Loan from './pages/Loan';
import MyLoans from './pages/MyLoans';
import Insurance from './pages/Insurance';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastProvider } from './context/ToastContext';
import './index.css';

import Account from './pages/Account';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="account" element={<Account />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="loans" element={<Loan />} />
              <Route path="my-loans" element={<MyLoans />} />
              <Route path="insurance" element={<Insurance />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
