import React, { useState } from "react";

// Import all images
import shirt1 from "./images/shirt1.jpeg";
import shirt2 from "./images/shirt2.jpeg";
import shirt3 from "./images/shirt3.jpeg";
import shirt4 from "./images/shirt4.jpeg";
import shirt5 from "./images/shirt5.jpeg";
import shirt6 from "./images/shirt6.jpeg";
import shirt7 from "./images/shirt7.jpeg";
import shirt8 from "./images/shirt8.jpeg";
import shirt9 from "./images/shirt9.jpeg";
import shirt10 from "./images/shirt10.jpeg";

const shirts = [
  { id: 1, name: "Shirt 1", price: 35, image: shirt1, seller: "Seller 1" },
  { id: 2, name: "Shirt 2", price: 35, image: shirt2, seller: "Seller 2" },
  { id: 3, name: "Shirt 3", price: 35, image: shirt3, seller: "Seller 3" },
  { id: 4, name: "Shirt 4", price: 35, image: shirt4, seller: "Seller 4" },
  { id: 5, name: "Shirt 5", price: 35, image: shirt5, seller: "Seller 5" },
  { id: 6, name: "Shirt 6", price: 35, image: shirt6, seller: "Seller 6" },
  { id: 7, name: "Shirt 7", price: 35, image: shirt7, seller: "Seller 7" },
  { id: 8, name: "Shirt 8", price: 35, image: shirt8, seller: "Seller 8" },
  { id: 9, name: "Shirt 9", price: 35, image: shirt9, seller: "Seller 9" },
  { id: 10, name: "Shirt 10", price: 35, image: shirt10, seller: "Seller 10" },
];

// Repeat the shirts to simulate a bigger catalog
const fullShirts = Array.from({ length: 100 }, (_, i) => ({
  ...shirts[i % shirts.length],
  id: i + 1, // unique id for React
}));

export default function ShopPage({ setPage, setSelectedShirt }) {
  const [currentPage, setCurrentPage] = useState(1);
  const shirtsPerPage = 24;

  const indexOfLastShirt = currentPage * shirtsPerPage;
  const indexOfFirstShirt = indexOfLastShirt - shirtsPerPage;
  const currentShirts = fullShirts.slice(indexOfFirstShirt, indexOfLastShirt);

  const totalPages = Math.ceil(fullShirts.length / shirtsPerPage);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Shop Shirts</h1>
      <div className="shop-grid">
        {currentShirts.map((shirt) => (
          <div
            key={shirt.id}
            className="shirt-card"
            onClick={() => {
              setSelectedShirt(shirt);
              setPage("detail");
            }}
          >
            <img src={shirt.image} alt={shirt.name} />
            <h3>{shirt.name}</h3>
            <p>${shirt.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={currentPage === idx + 1 ? "active" : ""}
            onClick={() => handleClick(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
