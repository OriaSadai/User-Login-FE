import React, { useState } from "react";
import Register from "./components/registration/Register";
import Login from "./components/registration/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/context/AuthProvider";
import ItemPage from "./components/itemPage/ItemPage";
import OrderList from "./components/orderList/OrderList";
import FavoriteList from "./components/favoriteList/FavoriteList";
import { OrderListProvider } from "./components/context/OrderListContext";

function App() {
  return (
    <>
      <AuthProvider>
        <OrderListProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/favorite" element={<FavoriteList />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Register />} />
          </Routes>
        </OrderListProvider>
      </AuthProvider>
    </>
  );
}

export default App;
