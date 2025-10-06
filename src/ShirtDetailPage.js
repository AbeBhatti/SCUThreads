import React, { useState } from "react";

export default function ShirtDetailPage({ selectedShirt, setPage, cart, setCart }) {
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    setCart([...cart, { ...selectedShirt, size, quantity }]);
    setPage("cart");
  }; 

  return (
    <div>
      <h2>{selectedShirt.name}</h2>
      <img
        src={selectedShirt.image}
        alt={selectedShirt.name}
        style={{ width: "200px", height: "auto" }} // smaller image
        className="responsive"
      />
      <p>Price: ${selectedShirt.price}</p>

      <div className="form-group">
        <label>Size:</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <button className="button" onClick={addToCart}>Add to Cart</button>
      <button className="button-alt" onClick={() => setPage("shop")}>Back to Shop</button>
    </div>
  );
}
