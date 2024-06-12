import React from "react";
import { useAuth } from "../../components/AuthContext";
import { Outlet } from "react-router-dom";
import { NoUserNabar } from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

export default function Auth() {
  const { user } = useAuth();
  return (
    <>
      <Outlet />
    </>
  );
}
