/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ fixed typo

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // ✅ use the correct hook

  if (loading) {
    return <div>Loading...</div>; // optionally add a spinner
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
