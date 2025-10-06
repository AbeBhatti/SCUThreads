import React, { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./Navbar";
import ShopPage from "./ShopPage";
import ShirtDetailPage from "./ShirtDetailPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";

export default function App() {
  const [page, setPage] = useState("shop");
  const [cart, setCart] = useState([]);
  const [selectedShirt, setSelectedShirt] = useState(null);

  useEffect(() => {
    document.title = "SCU Closet";
  }, []);

  return (
    <div className="app">
      {page !== "login" && <Navbar setPage={setPage} cart={cart} />}
      <main className="page-container">
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
