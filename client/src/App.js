import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AccountList from "./pages/AccountList";
import AddAccount from "./pages/AddAccount";
import PostCommission from "./pages/PostCommission";
import CommissionList from "./pages/CommissionList";
import Home from "./pages/Home";
import UpdateAccount from "./pages/UpdateAccount";
import UpdateCommission from "./pages/UpdateCommission";
//import "./style.css";
import CatcherHome from "./pages/CatcherHome";
import EmployerHome from "./pages/EmployerHome";
import ViewCommission from "./pages/ViewCommission";
import EmployerCommissions from "./pages/EmployerCommissionList";
import AdminHome from "./pages/AdminHome";
import ApplyCommission from "./pages/ApplyCommission";
import EmployerApplicants from "./pages/EmployerApplicants";
//MAP ROUTES
import Map from "./pages/CommissionMap";
import CatcherMap from "./pages/CatcherMap";
import EmployerMap from "./pages/EmployerMap";
import Notification from "./pages/Notification";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import testpage from "./pages/testpage";
import Application from "./pages/CatcherApplication";
import CatcherCommission from "./pages/CatcherCommissionPage";
//private route
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Transportation from "./pages/Services/Transpo";
import HomeServices from "./pages/Services/HomeServices";
import Delivery from "./pages/Services/Delivery";
//Errand Page
import ErrandPage from "./pages/ErrandPage";

function App() {
  return (
    <div className="App">
      <Router>
        {/**<AuthProvider> */}

        <Routes>
          {/* ACCOUNT REG */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" exact Component={SignUp} />
          {/* UNIVERSAL */}
          <Route path="/profile/:userID" exact Component={Profile} />
          <Route path="/" exact Component={Landing} />
          <Route
            path="/view-errand/:userID/:commissionID/"
            element={<ErrandPage />}
          />
          <Route
            path="/view-commission/:userID/:commissionID/"
            element={<ViewCommission />}
          />
          <Route path="/notifications/:userID" exact Component={Notification} />

          <Route path="/Menu" exact Component={Menu} />
          <Route path="/testpage" exact Component={testpage} />
          <Route path="/Transpo" exact Component={Transportation} />
          <Route path="/HomeService" exact Component={HomeServices} />
          <Route path="/Delivery" exact Component={Delivery} />
          <Route
            path="/update-account/:userID"
            exact
            Component={UpdateAccount}
          />
          {/* <Route path="/admin-home/:userID" element={<AdminHome />} /> */}
          {/* <Route path="/" exact Component={Home} /> */}
          {/* ADMIN */}
          <Route path="/accounts" exact Component={AccountList} />
          <Route path="/add" exact Component={AddAccount} />
          <Route path="/map" element={<Map />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/commission-list" exact Component={CommissionList} />
          <Route
            path="/update-account/:userID"
            exact
            Component={UpdateAccount}
          />
          {/* EMPLOYER */}
          <Route path="/e-map/:userID" element={<EmployerMap />} />
          <Route path="/applicants/:userID" element={<EmployerApplicants />} />
          <Route
            path="/commissions/:userID"
            element={<EmployerCommissions />}
          />
          <Route path="/e-home/:userID" exact Component={EmployerHome} />
          <Route path="/post-commission/:userID" elemnt={<PostCommission />} />
          <Route
            path="/update-commission/:commissionID/:userID"
            elemnt={<UpdateCommission />}
          />
          {/* CATCHER */}
          <Route
            path="/apply-commission/:commissionID/:userID"
            element={<ApplyCommission />}
          />
          <Route path="/c-map/:userID" element={<CatcherMap />} />
          <Route path="/c-home/:userID" exact Component={CatcherHome} />
          <Route path="/my-application/:userID" element={<Application />} />
          <Route
            path="/catcher-errands/:userID"
            element={<CatcherCommission />}
          />
        </Routes>
        {/**<PrivateRoute path="/admin-home" element={<AdminHome />} />
        </AuthProvider>*/}
      </Router>
    </div>
  );
}

export default App;
