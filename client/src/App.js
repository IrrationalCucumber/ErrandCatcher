import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AccountList from "./pages/AccountList";
import AddAccount from "./pages/AddAccount";
import PostCommission from "./pages/PostCommission";
import CommissionList from "./pages/CommissionList";
import Home from "./pages/Home";
//import Navbar from "./components/Navbar";
import UpdateAccount from "./pages/UpdateAccount"
import UpdateCommission from "./pages/UpdateCommission";
//import "./style.css";
import CatcherHome from "./pages/CatcherHome"
import EmployerHome from "./pages/EmployerHome"
import ViewCommission from "./pages/ViewCommission";
import EmployerCommissions from "./pages/EmployerCommissionList"
import AdminHome from "./pages/AdminHome";
import ApplyCommission from "./pages/ApplyCommission";
import EmployerApplicants from "./pages/EmployerApplicants";
import Map from "./pages/CommissionMap";
import CatcherMap from "./pages/CatcherMap";

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path="/accounts" exact Component={AccountList}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" exact Component={SignUp}/>
          <Route path='/profile' exact Component={Profile}/>
          <Route path='/add' exact Component={AddAccount}/>
          <Route path='/post-commission/:userID' exact Component={PostCommission}/>
          <Route path='/commission-list' exact Component={CommissionList}/>
          <Route path="/update-account/:userID" exact Component={UpdateAccount}/>
          <Route path="/update-commission/:commissionID/:userID" exact Component={UpdateCommission} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/e-home/:userID" exact Component={EmployerHome} />
          <Route path="/commissions/:userID" exact Component={EmployerCommissions} />
          <Route path="/c-home/:userID" exact Component={CatcherHome} />
          <Route path="/view-commission/:commissionID/" exact Component={ViewCommission} />
          <Route path="/apply-commission/:commissionID/:userID" exact Component={ApplyCommission} />
          <Route path="/applicants/:userID" exact Component={EmployerApplicants} />
          <Route path="/map" element={<Map/>} />
          <Route path="/c-map" element={<CatcherMap/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
