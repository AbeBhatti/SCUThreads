import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginSuccessPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse query params from URL
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const name = params.get("name");

    if (email && name) {
      onLoginSuccess({ email, name }); // store in App state
      navigate("/shop"); // redirect to shop
    } else {
      alert("Login failed");
      navigate("/login");
    }
  }, [location, onLoginSuccess, navigate]);

  return <p>Logging in...</p>;
}
