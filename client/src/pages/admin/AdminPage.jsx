import React from "react";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AdminPage;
