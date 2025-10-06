import React from "react";

export default function LoginPage({ onLoginSuccess }) {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login with SCU Google</h1>
      <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Login with SCU
      </button>
    </div>
  );
}
