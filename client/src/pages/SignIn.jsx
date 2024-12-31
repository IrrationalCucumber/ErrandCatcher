import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Error.css"; // Import your custom CSS for stylin
import "./signin.css";
import { useAuth } from "../components/AuthContext";
import Alert from "@mui/joy/Alert";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoadingBackdrop from "../components/LoadingSpinner";

const SignIn = () => {
  const [username, setUsername] = useState(""); //username
  const [password, setPassword] = useState(""); //passwod
  const [userID, setUserID] = useState(""); //var for id
  const [errorMessage, setErrorMessage] = useState(""); //error message
  const [rememberMe, setRememberMe] = useState(false); //remember me function
  const { updateUser } = useAuth(); // Get the login function from useAut
  const [loading, setLoading] = useState(false);

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
      //console.log("Response from server:", res.data); //debug
      const user = res.data;
      //console.log(user);
      //revert login() function for PrivateBrowser
      if (user != null) {
        const userData = {
          username: user.username,
          userID: user.userID,
          userType: user.accountType,
          status: user.accountStatus,
          hasErrand: user.userHasErrand,
        };
        setLoading(true);
        // 2 seconds cd
        setTimeout(() => {
          setLoading(false);
          updateUser(userData);
          navigate(`/dashboard/home/`);
        }, 2000);

        // updateUser(userData);
        // navigate(`/dashboard/home/`);
        //login();
      }
      //handle me function
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
    } catch (err) {
      setLoading(true);
      // 3 seconds cd
      setTimeout(() => {
        setLoading(false); // Remove the loading spinner
        setErrorMessage("Invalid Password or Username please try again");
      }, 3000);

      console.error("Error during sign-in:", err);
      // setErrorMessage("Invalid Password/Username");
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
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission
          handleClick(); // Call your custom submit logic
        }}
        className="cont contman"
      >
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
          // style={{ paddingLeft: "140px", fontSize: "12px" }}
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
          <div className="button2">
            <button
              id="buttonSignin"
              type="submit"
              //onClick={handleClick}
            >
              Sign In
            </button>
          </div>
        </div>
        <p className="cont2">
          <i>
            Don't have an Account? <Link to="/sign-up"> Sign-up!</Link>
          </i>
        </p>
      </form>
      <div className="contman cont-tawo">
        <img src="http://localhost:3000/images/tawo.png" alt="" />
      </div>
      <LoadingBackdrop
        open={loading}
        text="Loading... Please wait while Searching Your Account"
        icons={<HourglassBottomIcon />}
      />
    </div>
  );
};

export default SignIn;
