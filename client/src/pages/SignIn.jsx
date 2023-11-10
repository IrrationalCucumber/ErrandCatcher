import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";
import "./Error.css"; // Import your custom CSS for styling

const SignIn = () => {
  const [username, setUsername] = useState(""); //username
  const [password, setPassword] = useState(""); //passwod
  const [userID, setUserID] = useState(""); //var for id
  const [errorMessage, setErrorMessage] = useState(""); //error message
  const [rememberMe, setRememberMe] = useState(false); //remember me function
  //remeber me function
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  //go-to-page function
  const navigate = useNavigate();

  const handleClick = async () => {
    //error handling
    if (!username || !password) {
      setErrorMessage("Please fill in both username and password.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8800/sign-in", {
        params: { username: username, password: password },
      });

      const user = res.data[0];
      // check user type
      if (user) {
        setUserID(user.userID);
        if (user.accountType === "Employer") {
          navigate(`/e-home/${user.userID}`);
        } else if (user.accountType === "admin") {
          navigate(`/admin-home`);
        } else if (user.accountType === "Catcher") {
          navigate(`/c-home/${user.userID}`);
        }
      } else {
        setErrorMessage("Invalid password/username");
      }
      //handle me function
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
    } catch (err) {
      console.log(err);
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
      <form>
        <div className="cont">
          <h1>WELCOME TO ERRAND CATCHER</h1>
          <p>Sign-in now to get in</p>
          <input
            className={errorMessage ? "error" : "in"}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            className={errorMessage ? "error" : "in"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <p className="em">
            <i>{errorMessage}</i>
          </p>
          <br />
          <br />
          <label className="rem" htmlFor="rememberMe">
            Remember&nbsp;Me
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
          </label>

          <button className="in" onClick={handleClick}>
            Sign In
          </button>

          <p>
            <i>
              Don't have an Account? Sign-up <Link to="/sign-up">here!</Link>
            </i>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
