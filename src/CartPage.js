import React from "react";

export default function CartPage({ cart, setCart }) {
  const removeItem = (index) => setCart(cart.filter((_, i) => i !== index));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart }), // send the entire cart
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // redirect straight to Stripe Checkout
      } else {
        console.error("No checkout URL returned", data); 
        alert("Checkout failed.");
      }
    } catch (err) {
      console.error("Checkout fetch error:", err);
      alert("Checkout request failed: " + err.message);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, idx) => (
          <div key={idx} className="cart-item">
            <div className="cart-item-info">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-text">
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div>
              <p className="cart-item-price">${item.price * item.quantity}</p>
              <button className="remove-btn" onClick={() => removeItem(idx)}>x</button>
            </div>
          </div>
        ))
      )}
      <div className="checkout-summary">
        <p>Total:</p>
        <span>${total}</span>
      </div>
      <button className="button" onClick={handleCheckout} disabled={cart.length === 0}>
        Checkout
      </button>
    </div> 
  );
}
