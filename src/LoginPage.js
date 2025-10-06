import React from "react";

export default function LoginPage({ onLoginSuccess }) {
  const handleLogin = async () => {
    try {
      // Redirect to backend Google OAuth
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, {
        credentials: "include", // send cookies if needed
      });

      // Backend will redirect to Google login, so we don't expect JSON here
      // Instead, you can use window.location.href to backend login
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    } catch (err) {
      console.error("Login request failed:", err);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div>
      <h1>Login with SCU Google</h1>
      <button onClick={handleLogin}>Login with SCU</button>
    </div>
  );
}
