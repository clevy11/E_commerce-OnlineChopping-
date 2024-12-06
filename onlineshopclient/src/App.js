import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CreateProduct from "./components/CreateProduct";
import Logout from "./components/Auth/Logout";
import Orders from "./components/Order/Orders";
import EditProduct from './components/EditProduct';
import Forbidden from './components/Shared/Forbidden';
import RequireAuth from './routes/RequireAuth';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/product/details/:productId" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />


        <Route element={<RequireAuth requiredRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
        </Route>


        <Route element={<RequireAuth requiredRoles={["ADMIN"]} />}>
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
        </Route>

        <Route path='/forbidden' element={<Forbidden />} />

        <Route element={<Default />} />
      </Routes>
      <Modal />
    </React.Fragment>
  );
}

export default App;
