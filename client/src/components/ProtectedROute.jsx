// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ allowedUserTypes, children }) => {
  const { user } = useAuth();

  if (!allowedUserTypes.includes(user.userType)) {
    // Redirect unauthorized users to a default page, e.g., a 403 or homepage
    return <Navigate to="*" replace />;
  }

  return children;
};
