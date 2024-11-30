import React, { useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { useAuth } from "../AuthContext";
import { Alert, Button } from "@mui/joy";

function Resetpassword(props) {
    const popupStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: "50",
    };

    const popupInnerStyle = {
        position: 'relative',
        padding: '32px',
        width: '100%',
        maxWidth: '980px',
        height: '75vh',
        overflowY: 'auto',
        backgroundColor: '#FFF',
        zIndex: "999999"
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '16px',
        right: '16px',
        padding: '0',
        border: 'none',
        cursor: 'pointer',
        background: 'none'
    };

    const { user } = useAuth();
    const userID = user.userID;

    const [account, setAccount] = useState({
        password: "",
        conPassword: "",
    });

    //Alert feedback
    const [message, setMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");
    const [iconlert, setIconLert] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const [strength, setStrength] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value,
        }));
    };
    console.log(account)




    const changePassword = async (event) => {
        event.preventDefault();

        if (account.password !== account.conPassword) {
            setMessage("Password is not match please try again");
            setAlertColor("danger");
            setIconLert(<WarningIcon />);
            setShowAlert(true);
            return;
        } else if (account.password.length < 8) {
            setMessage("Password must be at least 8 characters long");
            setAlertColor("danger");
            setIconLert(<WarningIcon />);
            setShowAlert(true);
            return;
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(
                account.password
            )
        ) {
            setMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number");
            setAlertColor("danger");
            setIconLert(<WarningIcon />);
            setShowAlert(true);
            return;
        }

        try {
            // endpoint route
            await axios.put("http://localhost:8800/resetpassword/" + userID, account);
            // await axios.put("http://localhost:8800/update/" + userID, account);
            console.log("send hopefully to newendpoint", account)
            alert("Your new password is successfully changed!");
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }


    function evaluatePasswordStrength(password) {
        let score = 0;

        if (!password) return "";

        // Check password length
        if (password.length > 8) score += 1;
        // Contains lowercase
        if (/[a-z]/.test(password)) score += 1;
        // Contains uppercase
        if (/[A-Z]/.test(password)) score += 1;
        // Contains numbers
        if (/\d/.test(password)) score += 1;
        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        switch (score) {
            case 0:
            case 1:
            case 2:
                return "Weak";
            case 3:
                return "Medium";
            case 4:
            case 5:
                return "Strong";
        }
    }

    const getStrengthColor = (strength) => {
        switch (strength) {
            case "Weak":
                return "red";
            case "Medium":
                return "orange";
            case "Strong":
                return "green";
            default:
                return "transparent";
        }
    };

    const getStrengthWidth = (strength) => {
        switch (strength) {
            case "Weak":
                return "30%";
            case "Medium":
                return "66%";
            case "Strong":
                return "100%";
            default:
                return "0";
        }
    };



    return (props.trigger) ? (
        <div style={popupStyle}>
            <div style={popupInnerStyle}>
                <button style={closeButtonStyle} onClick={() => props.setTrigger(false)}>
                    <CloseIcon sx={{ fontSize: 20 }}></CloseIcon>
                </button>
                {props.children}


                {showAlert && (
                    <Alert
                        sx={{
                            position: "fixed",
                            bottom: 16,
                            right: 16,
                            zIndex: 9999,
                            transform: showAlert ? "translateX(0)" : "translateX(100%)",
                            transition: "transform 0.5s ease-in-out",
                        }}
                        color={alertColor}
                        size="lg"
                        variant="solid"
                        // icon={iconlert}
                        startDecorator={iconlert}
                        endDecorator={
                            <Button
                                size="sm"
                                variant="solid"
                                color={alertColor}
                                onClick={(e) => setShowAlert(false)}
                            >
                                <CloseIcon />
                            </Button>
                        }
                    >
                        {message}
                    </Alert>
                )}


                <div className="form-container">
                    <h3 className="titlehead">
                        Change your Password
                    </h3>

                    <form className="form"
                        onSubmit={changePassword}
                    >
                        <div className="form-group">
                            <label for="password">New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={account.password}
                                // onChange={handleChange}
                                onChange={(event) => {
                                    setAccount((prev) => ({
                                        ...prev,
                                        [event.target.name]: event.target.value,
                                    }));
                                    setStrength(
                                        evaluatePasswordStrength(event.target.value)
                                    );
                                }}
                                placeholder="Enter your new password"
                                required
                            />
                            {account.password && (
                                <>
                                    <div
                                        className={`password-strength ${strength === "Weak"
                                            ? "strength-weak"
                                            : strength === "Medium"
                                                ? "strength-medium"
                                                : strength === "Strong"
                                                    ? "strength-strong"
                                                    : ""
                                            }`}
                                    >
                                        Password strength: {strength}
                                    </div>

                                    <div className="strength-meter">
                                        <div
                                            className="strength-meter-fill"
                                            style={{
                                                width: getStrengthWidth(strength),
                                                backgroundColor: getStrengthColor(strength),
                                            }}
                                        />
                                    </div>
                                </>
                            )}

                            <br></br>

                            <label for="conPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="conpassword"
                                name="conPassword"
                                value={account.conPassword}
                                onChange={handleChange}
                                placeholder="Try again, type your new password"
                                required
                            />
                        </div>
                        <button className="form-submit-btn"
                            type="submit"
                        >
                            Change my Password
                        </button>
                    </form>
                </div>

            </div>
        </div>

    ) : null;
}


export default Resetpassword;
