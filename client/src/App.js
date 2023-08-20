import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AccountList from "./pages/AccountList";
import AddAccount from "./pages/AddAccount";
import PostCommission from "./pages/PostCommission";
import CommissionList from "./pages/CommissionList";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EmployerHome from "./pages/EmployerHome";
import CatcherHome from "./pages/CatcherHome"
//import "./style.css";


function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/accounts" exact Component={AccountList}/>
        <Route path="/sign-in" exact Component={SignIn}/>
        <Route path="/sign-up" exact Component={SignUp}/>
        <Route path='/profile' exact Component={Profile}/>
        <Route path='/add' exact Component={AddAccount}/>
        <Route path='/post-commission' exact Component={PostCommission}/>
        <Route path='/commission-list' exact Component={CommissionList}/>
        <Route path="/e-home/:userID" element={<EmployerHome />} />
        <Route path="/admin-home/:userID" element={<Home />} />
        <Route path="/c-home/:userID" element={<CatcherHome />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
