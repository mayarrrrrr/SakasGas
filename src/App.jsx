import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register';
import './App.css'
import Admin from './admin/Admin';
import Client from './client/Client';
import ClientProducts from './client/ClientProducts';
import ClientCart from './client/ClientCart';
import ClientOrder from './client/ClientOrder';
import AdminOrder from './admin/AdminOrder';
import AdminProducts from './admin/AdminProducts';
import DynamicRoute from './DynamicRoute';

function App() {

  return (
    <>
      <div>
      <Routes>
        <Route path='/register' element={<DynamicRoute element={Register} title="Sign Up " />}>Register</Route>
        <Route path='/login' element={<DynamicRoute element={Login} title="Sign In" />} ></Route>
        <Route path='/admin' element={<DynamicRoute element={Admin} title="BONMAJ||Admin" />}>
          <Route path='orders' element={<DynamicRoute element={AdminOrder} title="BONMAJ||Orders" />} ></Route>
          <Route path='products' element={<DynamicRoute element={AdminProducts} title="BONMAJ||Products" />} ></Route>
        </Route>
        <Route path='/client' element={<DynamicRoute element={Client} title="BONMAJ||Home" />} >
          <Route path="products" element={<DynamicRoute element={ClientProducts} title="BONMAJ||Products" />} />
          <Route path="cart" element={<DynamicRoute element={ClientCart} title="Shopping Cart" />}  />
          <Route path="order" element={<DynamicRoute element={ClientOrder} title="Orders" />}  />
          {/*add logout*/}
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
    </>
  )
}

export default App;
