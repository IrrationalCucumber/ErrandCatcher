import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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
import History from "./pages/History";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentSuccess from "./pages/PaymentSuccess";
import { ProtectedRoute } from "./components/ProtectedROute";
import GenerateReport from "./pages/admin/GenerateReport";
import VerificationSuccess from "./pages/VerificationSuceess";

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
        element: (
          <ProtectedRoute allowedUserTypes={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "accounts",
            element: <AccountList />,
          },
          {
            path: "errand-list",
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
          {
            path: "generate-report",
            element: <GenerateReport />,
          },
        ],
      },
      //EMPLOYER
      {
        path: "errands/",
        element: (
          <ProtectedRoute allowedUserTypes={["Employer"]}>
            <EmployerCommissions />
          </ProtectedRoute>
        ),
      },
      {
        path: "applicants/",
        element: (
          <ProtectedRoute allowedUserTypes={["Employer"]}>
            <EmployerApplicants />
          </ProtectedRoute>
        ),
      },
      {
        path: "e-map/",
        element: (
          <ProtectedRoute allowedUserTypes={["Employer"]}>
            <EmployerMap />
          </ProtectedRoute>
        ),
      },
      {
        path: "ongoing/",
        element: (
          <ProtectedRoute allowedUserTypes={["Employer"]}>
            <Ongoing />
          </ProtectedRoute>
        ),
      },
      //CATCHER
      {
        path: "catcher-errands/",
        element: (
          <ProtectedRoute allowedUserTypes={["Catcher"]}>
            <CatcherCommission />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-application/",
        element: (
          <ProtectedRoute allowedUserTypes={["Catcher"]}>
            <Application />
          </ProtectedRoute>
        ),
      },
      {
        path: "c-map/",
        element: (
          <ProtectedRoute allowedUserTypes={["Catcher"]}>
            <CatcherMap />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/errand/",
    element: <Errands />,
    children: [
      {
        path: "view/:comID",
        element: (
          <ProtectedRoute allowedUserTypes={["Catcher", "Employer", "admin"]}>
            <ErrandPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "view-commission/:comID",
        element: (
          <ProtectedRoute allowedUserTypes={["Employer", "admin"]}>
            <ViewCommission />
          </ProtectedRoute>
        ),
      },
      {
        path: "update/:comID",
        element: (
          <ProtectedRoute allowedUserTypes={["Employer", "admin"]}>
            <UpdateCommission />
          </ProtectedRoute>
        ),
      },
      {
        path: "post-errand",
        element: (
          <ProtectedRoute allowedUserTypes={["Employer", "admin"]}>
            <PostCommission />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute allowedUserTypes={["admin"]}>
            <AddAccount />
          </ProtectedRoute>
        ),
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
  { path: "/history", element: <History /> },

  // PROCESS PAYMENTS
  {
    path: "/paymentcancel",
    element: <PaymentCancel />,
  },
  {
    path: "/paymentsuccess",
    element: <PaymentSuccess />,
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
  { path: "/verify-email", element: <VerificationSuccess /> },
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
