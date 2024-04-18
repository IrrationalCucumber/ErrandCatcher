// PrivateRoute.js
import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";

const PrivateRoute = ({ path, ...props }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  // If authenticated, render the Route component
  return (
    <Routes>
      <Route path={path} {...props} />
    </Routes>
  );
};

export default PrivateRoute;
