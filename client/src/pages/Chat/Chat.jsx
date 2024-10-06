import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

function Chat() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Chat;
