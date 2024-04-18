import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp/Signup";
import Profile from "./pages/Profile";
import AccountList from "./pages/admin/AccountList";
import AddAccount from "./pages/admin/AddAccount";
import PostCommission from "./pages/PostCommission";
import CommissionList from "./pages/admin/CommissionList";
import Home from "./pages/Home";
import UpdateAccount from "./pages/UpdateAccount";
import UpdateCommission from "./pages/UpdateCommission";
//import "./style.css";
import CatcherHome from "./pages/CatcherHome";
import EmployerHome from "./pages/EmployerHome";
import ViewCommission from "./pages/ViewCommission";
import EmployerCommissions from "./pages/EmployerCommissionList";
import AdminHome from "./pages/admin/AdminHome";
import ApplyCommission from "./pages/ApplyCommission";
import EmployerApplicants from "./pages/EmployerApplicants";
//MAP ROUTES
import Map from "./pages/admin/CommissionMap";
import CatcherMap from "./pages/CatcherMap";
import EmployerMap from "./pages/EmployerMap";
import Notification from "./pages/Notification";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import testpage from "./pages/testpage";
import Application from "./pages/CatcherApplication";
import CatcherCommission from "./pages/CatcherCommissionPage";
import Ongoing from "./pages/Dropdown/Ongoing";
//private route
// import { AuthProvider } from "./components/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";

import Transportation from "./pages/Services/Transpo";
import HomeServices from "./pages/Services/HomeServices";
import Delivery from "./pages/Services/Delivery";
import Verification from "./pages/Verification";
import ErrandPage from "./pages/ErrandPage";
import ViewProfile from "./pages/ViewProfile";
import SearchPage from "./pages/SearchPage";
import RequestPage from "./pages/admin/Request/RequestPage";

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
          <Route
            path="/view-profile/:userID/:catcherID"
            element={<ViewProfile />}
          />
          <Route path="/verification/:userID" exact Component={Verification} />
          <Route path="/add" exact Component={AddAccount} />
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
          {/* SEARCH PAGES */}
          <Route path="/search/:id/:term" element={<SearchPage />} />
          <Route path="/Transpo/:userID/:type" element={<Transportation />} />
          <Route path="/HomeService/:userID/:type" element={<HomeServices />} />
          <Route path="/Delivery/:userID/:type" element={<Delivery />} />
          <Route path="/update-account/:userID" element={<UpdateAccount />} />
          {/* <Route path="/admin-home/:userID" element={<AdminHome />} /> */}
          <Route path="/home/:userID" exact Component={Home} />
          {/* ADMIN */}
          <Route path="/accounts/:userID" element={<AccountList />} />
          <Route path="/add" exact Component={AddAccount} />
          <Route path="/map/:id" element={<Map />} />
          <Route path="/request/:id" element={<RequestPage />} />
          <Route path="/admin-home/:userID" element={<AdminHome />} />
          <Route
            path="/commission-list/:userID"
            exact
            Component={CommissionList}
          />
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
          <Route path="/post-commission/:userID" element={<PostCommission />} />
          <Route
            path="/update-commission/:commissionID/:userID"
            element={<UpdateCommission />}
          />
          <Route path="/ongoing/:id" element={<Ongoing />} />
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
