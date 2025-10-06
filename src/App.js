import React, { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./Navbar";
import ShopPage from "./ShopPage";
import ShirtDetailPage from "./ShirtDetailPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import LoginPage from "./LoginPage";
import LoginSuccessPage from "./LoginSuccessPage";


export default function App() {
  const [page, setPage] = useState("login"); // start on login page
  const [cart, setCart] = useState([]);
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [user, setUser] = useState(null); // store logged-in user info

  useEffect(() => {
    document.title = "SCU Closet";
  }, []);

  // Called after successful login to set user and navigate to shop
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setPage("shop");
  };

  return (
    <div className="app">
      {/* Show navbar only if logged in */}
      {user && <Navbar setPage={setPage} cart={cart} />}
      <main className="page-container">
        {page === "login" && <LoginPage onLoginSuccess={handleLoginSuccess} />}
        {page === "login-success" && <LoginSuccessPage onLoginSuccess={handleLoginSuccess} />}
        {page === "shop" && <ShopPage setPage={setPage} setSelectedShirt={setSelectedShirt} />}
        {page === "detail" && selectedShirt && (
          <ShirtDetailPage selectedShirt={selectedShirt} setPage={setPage} cart={cart} setCart={setCart} />
          )}
          {page === "cart" && <CartPage cart={cart} setCart={setCart} setPage={setPage} />}
          {page === "checkout" && <CheckoutPage cart={cart} setCart={setCart} setPage={setPage} />}
          </main>
      <footer>
        <p>© 2025 SCU Closet</p>
      </footer>
    </div>
  );
}
