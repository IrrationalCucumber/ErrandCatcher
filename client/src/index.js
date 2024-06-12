import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Verification from "./pages/profile/Verification";
import Notification from "./pages/Notification";
import MapComponent from "./pages/testpage";
import "./style.css";
import "./App.css";
//DISPLAY
import Landing from "./pages/Landing/Landing";
import Menu from "./pages/Menu";
import ErrandPage from "./pages/errand  views/ErrandPage";
import ViewProfile from "./pages/profile/ViewProfile";
import ProfilePage from "./pages/profile/ProfilePage";
import ViewCommission from "./pages/errand  views/ViewCommission";
import Errands from "./pages/errand  views/Errands";
import ErrorElement from "./pages/ErrorElement";
import Us from "./pages/Dashboard/Us";
import About from "./pages/Dashboard/About";
import Contact from "./pages/Dashboard/Contact";
//UPDATE/REGISTER
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp/Signup";
import UpdateAccount from "./pages/profile/UpdateAccount";
import Profile from "./pages/profile/Profile";
//ADMIN Routes
import AccountList from "./pages/admin/AccountList";
import AddAccount from "./pages/admin/AddAccount";
import CommissionList from "./pages/admin/CommissionList";
import AdminHome from "./pages/admin/AdminHome";
import Map from "./pages/admin/CommissionMap";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequestPage from "./pages/admin/Request/RequestPage";
//CATCHER Routes
import CatcherHome from "./pages/catcher/CatcherHome";
import CatcherMap from "./pages/catcher/CatcherMap";
import ApplyCommission from "./pages/catcher/ApplyCommission";
import Application from "./pages/catcher/CatcherApplication";
import CatcherCommission from "./pages/catcher/CatcherCommissionPage";
//EMPLOYER Routes
import EmployerHome from "./pages/employer/EmployerHome";
import PostCommission from "./pages/errand  views/PostCommission";
import EmployerCommissions from "./pages/employer/EmployerCommissionList";
import EmployerApplicants from "./pages/employer/EmployerApplicants";
import EmployerMap from "./pages/employer/EmployerMap";
import UpdateCommission from "./pages/errand  views/UpdateCommission";
import Ongoing from "./pages/Dropdown/Ongoing";
//SEARCH/ CATEGORY Routes
import Transportation from "./pages/Services/Transpo";
import HomeServices from "./pages/Services/HomeServices";
import Delivery from "./pages/Services/Delivery";
import SearchPage from "./pages/SearchPage";
import Service from "./pages/Services/Service";
//restrict
import { AuthProvider } from "./components/AuthContext";
import AdminPage from "./pages/admin/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
    children: [
      { path: "home", element: <Home /> },
      {
        path: "admin/",
        element: <AdminPage />,
        children: [
          {
            path: "accounts",
            element: <AccountList />,
          },
          {
            path: "commission-list",
            element: <CommissionList />,
          },
          {
            path: "map",
            element: <Map />,
          },
          {
            path: "request",
            element: <RequestPage />,
          },
        ],
      },
      //EMPLOYER
      {
        path: "commissions/",
        element: <EmployerCommissions />,
      },
      {
        path: "applicants/",
        element: <EmployerApplicants />,
      },
      {
        path: "e-map/",
        element: <EmployerMap />,
      },
      {
        path: "ongoing/",
        element: <Ongoing />,
      },
      //CATCHER
      {
        path: "catcher-errands/",
        element: <CatcherCommission />,
      },
      {
        path: "my-application/",
        element: <Application />,
      },
      {
        path: "c-map/",
        element: <CatcherMap />,
      },
    ],
  },
  {
    path: "/errand/",
    element: <Errands />,
    children: [
      {
        path: "view-errand/:comID",
        element: <ErrandPage />,
      },
      {
        path: "view-commission/:comID",
        element: <ViewCommission />,
      },
      {
        path: "update-commission/:comID",
        element: <UpdateCommission />,
      },
      {
        path: "post-commission",
        element: <PostCommission />,
      },
    ],
  },
  //SERVICES / CATEGIRY
  {
    path: "/service/",
    element: <Service />,
    children: [
      {
        path: "Transpo/:type",
        element: <Transportation />,
      },
      {
        path: "Delivery/:type",
        element: <Delivery />,
      },
      {
        path: "HomeService/:type",
        element: <HomeServices />,
      },
    ],
  },
  //SEARCH PAGE
  {
    path: "/search/:term",
    element: <SearchPage />,
  },
  //PROFILE PAGES
  {
    path: "/profile/",
    element: <ProfilePage />,
    children: [
      {
        path: "me",
        element: <Profile />,
      },
      {
        path: "update",
        element: <UpdateAccount />,
      },
      {
        path: "user/:id",
        element: <ViewProfile />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
      {
        path: "add",
        element: <AddAccount />,
      },
    ],
  },
  {
    path: "/notifications",
    element: <Notification />,
  },

  { path: "sign-in", element: <SignIn /> },
  {
    path: "sign-up",
    element: <SignUp />,
  },

  { path: "/test", element: <MapComponent /> },
  //MISCILLANOUS PAGES
  {
    path: "/us/",
    element: <Us />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
