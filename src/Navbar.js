import React from "react";

export default function Navbar({ setPage, cart }) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 style={{color:'white'}}>SCU Closet</h2>
      </div>
      <div className="nav-right">
        <div className="icon-button" onClick={() => setPage("shop")}>🏠</div>
        <div className="icon-button" onClick={() => setPage("cart")}>
          🛒
          {cart.length > 0 && <div className="cart-bubble">{cart.length}</div>}
        </div>
      </div>
    </div>
  );
}
