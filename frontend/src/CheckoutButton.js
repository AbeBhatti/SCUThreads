import React from "react";

export default function CheckoutButton({ item, amount }) {
  const handleCheckout = async () => {
    try {
      // Send request to backend to create a Stripe Checkout session
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item, amount }),
        }
      );

      const data = await response.json();

      if (data.url) {
        console.log("Redirecting to Stripe Checkout:", data.url);
        window.location.href = data.url;
      } else if (data.error) {
        console.error("Stripe backend error:", data.error);
        alert("Checkout failed: " + data.error);
      } else {
        console.error("Unexpected response:", data);
        alert("Checkout failed: unexpected response from server.");
      }
    } catch (err) {
      console.error("Checkout request failed:", err);
      alert("Checkout request failed: " + err.message);
    }
  };

  return (
    <button className="button" onClick={handleCheckout}>
      Buy Now
    </button>
  );
}
