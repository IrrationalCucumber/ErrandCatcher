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
import Map from "./pages/CommissionMap";
import CatcherMap from "./pages/CatcherMap";
import Notification from "./pages/Notification";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import testpage from "./pages/testpage";
//private route
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Transportation from "./pages/Services/Transpo";
import HomeServices from "./pages/Services/HomeServices";
import Delivery from "./pages/Services/Delivery";

function App() {
  return (
    <div className="App">
      <Router>
        {/**<AuthProvider> */}

        <Routes>
          <Route path="/accounts" exact Component={AccountList} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" exact Component={SignUp} />
          <Route path="/profile/:userID" exact Component={Profile} />
          <Route path="/add" exact Component={AddAccount} />
          <Route path="/" exact Component={Landing}/> 
          <Route path="/Menu" exact Component={Menu}/>  
          <Route path="/testpage" exact Component={testpage}/>
          <Route path="/Transpo" exact Component={Transportation}/>
          <Route path="/HomeService" exact Component={HomeServices}/>
          <Route path="/Delivery" exact Component={Delivery}/>
          <Route
            path="/post-commission/:userID"
            exact
            Component={PostCommission}
          />
          <Route path="/commission-list" exact Component={CommissionList} />
          <Route
            path="/update-account/:userID"
            exact
            Component={UpdateAccount}
          />
          <Route
            path="/update-commission/:commissionID/:userID"
            exact
            Component={UpdateCommission}
          />
          {/* <Route path="/admin-home/:userID" element={<AdminHome />} /> */}

          <Route path="/e-home/:userID" exact Component={EmployerHome} />
          <Route
            path="/commissions/:userID"
            exact
            Component={EmployerCommissions}
          />
          <Route path="/c-home/:userID" exact Component={CatcherHome} />
          <Route
            path="/view-commission/:commissionID/"
            exact
            Component={ViewCommission}
          />
          <Route
            path="/apply-commission/:commissionID/:userID"
            exact
            Component={ApplyCommission}
          />
          <Route
            path="/applicants/:userID"
            exact
            Component={EmployerApplicants}
          />
          <Route path="/map" element={<Map />} />
          <Route path="/c-map" element={<CatcherMap />} />
          <Route path="/notifications/:userID" exact Component={Notification} />
          {/* <Route path="/" exact Component={Home} /> */}
         <Route path="/admin-home" element={<AdminHome />} />
        </Routes>
        {/**<PrivateRoute path="/admin-home" element={<AdminHome />} />
        </AuthProvider>*/}
      </Router>
    </div>
  );
}

export default App;
