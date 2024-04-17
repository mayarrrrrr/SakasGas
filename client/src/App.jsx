import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register';
import './App.css'
import Admin from './admin/Admin';
import Client from './client/Client';
import ClientProducts from './client/ClientProducts';
import ClientCart from './client/ClientCart';
import ClientCheckout from './client/ClientCheckout';
import ClientOrder from './client/ClientOrder';

function App() {

  return (
    <>
      <div>
      <Routes>
        <Route path='/register' element={<Register/>}>Register</Route>
        <Route path='/login' element={<Login/>}>Login</Route>
        <Route path='/admin' element={<Admin/>}>Admin</Route>
        <Route path='/client' element={<Client/>}>
          <Route path="products" element={<ClientProducts />} />
          <Route path="cart" element={<ClientCart />} />
          <Route path="checkout" element={<ClientCheckout />} />
          <Route path="order" element={<ClientOrder />} />
        </Route>
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </div>
    </>
  )
}

export default App
