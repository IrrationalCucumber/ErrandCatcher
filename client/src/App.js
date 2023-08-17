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


function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
        <Route path='/' exact Component={Home}/>
        <Route path="/accounts" exact Component={AccountList}/>
        <Route path="/sign-in" exact Component={SignIn}/>
        <Route path="/sign-up" exact Component={SignUp}/>
        <Route path='/profile' exact Component={Profile}/>
        <Route path='/add' exact Component={AddAccount}/>
        <Route path='/post-commission' exact ={PostCommission}/>
        <Route path='/commission-list' exact Component={CommissionList}/>
        <Route path="/update-account/:userID" exact Component={UpdateAccount}/>
        <Route path="/update-commission/:commissionID" exact Component={UpdateCommission} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
