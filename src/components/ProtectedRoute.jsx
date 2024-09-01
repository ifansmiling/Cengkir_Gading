import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  // Jika token tidak ada, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika token ada, tampilkan komponen yang diminta
  return <Component {...rest} />;
};

export default ProtectedRoute;
