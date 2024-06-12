import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Error.css"; // Import your custom CSS for stylin
import "./signin.css";
import { useAuth } from "../components/AuthContext";
import Alert from "@mui/joy/Alert";

const SignIn = () => {
  const [username, setUsername] = useState(""); //username
  const [password, setPassword] = useState(""); //passwod
  const [userID, setUserID] = useState(""); //var for id
  const [errorMessage, setErrorMessage] = useState(""); //error message
  const [rememberMe, setRememberMe] = useState(false); //remember me function
  const { updateUser } = useAuth(); // Get the login function from useAut

  //remeber me function
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  //go-to-page function
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!username || !password) {
      setErrorMessage("Please fill in both username/password.");
      return;
    }
    try {
      const res = await axios.get("http://localhost:8800/sign-in", {
        params: { username: username, password: password },
      });

      console.log("Response from server:", res.data); //debug
      const user = res.data;
      console.log(user);
      //revert login() function for PrivateBrowser
      if (user != null) {
        const userData = {
          username: user.username,
          userID: user.userID,
          userType: user.accountType,
          status: user.accountStatus,
        };
        updateUser(userData);
        navigate(`/dashboard/home/`);
        //login();
      }
      //handle me function
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
    }
  };
  //handle rember me if check
  useEffect(() => {
    const isRemembered = localStorage.getItem("rememberMe");
    if (isRemembered) {
      // Set the checkbox state to true
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="si">
      <div className="cont contman">
        <div className="si-txt">
          <h1>
            <span className="welcome">Welcome</span> to{" "}
            <span className="errand-catcher" style={{ color: "#1679AB" }}>
              ERRAND CATCHER
            </span>
          </h1>
          <div className="text">
            <div className="sign"></div>
            <h3>Sign-in Now</h3>
          </div>
        </div>
        <input
          className={errorMessage ? "error" : ""}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          className={errorMessage ? "error" : ""}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <div className="em">
          {errorMessage != "" && (
            <Alert color="danger" size="lg" variant="outlined">
              <i style={{ fontSize: 12 }}>{errorMessage}</i>
            </Alert>
          )}
        </div>
        <label
          className="rem"
          htmlFor="remember Me"
          style={{ paddingLeft: "140px", fontSize: "12px" }}
        >
          Remember&nbsp;Me
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </label>

        <div className="button1">
          <div className="button2"></div>
          <button
            type="button"
            onClick={handleClick}
            style={{
              backgroundColor: "#1679AB",
              fontSize: "16px",
              width: "200px",
              height: "40px",
              borderRadius: "20px",
              color: "#ffff",
            }}
          >
            Sign In
          </button>
        </div>
        <p className="cont2">
          <i>
            Don't have an Account? <Link to="/sign-up"> Sign-up!</Link>
          </i>
        </p>
      </div>
      <div className="contman cont-tawo">
        <img src="http://localhost:3000/images/tawo.png" alt="" />
      </div>
    </div>
  );
};

export default SignIn;
