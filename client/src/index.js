import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Root from "./pages/admin/Root";
import AdminHome from "./pages/admin/AdminHome";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AccountList from "./pages/admin/AccountList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import CommissionList from "./pages/admin/CommissionList";
import Map from "./components/Map";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "home/:userID", element: <Home /> },
      {
        path: "accounts/:userID",
        element: <AccountList />,
      },
      {
        path: "commission-list/:userID",
        element: <CommissionList />,
      },
      {
        path: "map",
        element: <Map />,
      },
    ],
  },
  {
    path: "/profile/:userID",
    element: <Profile />,
  },
  {
    path: "/notifications/:userID",
    element: <Notification />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  { path: "/sign-in", element: <SignIn /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
