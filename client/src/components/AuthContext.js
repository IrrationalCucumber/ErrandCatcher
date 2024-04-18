// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    // Save user data to local storage whenever it changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    //setUser("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
