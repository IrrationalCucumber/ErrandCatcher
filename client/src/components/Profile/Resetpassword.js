import React, { useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../AuthContext";

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
        try {
            // endpoint route
            await axios.put("http://localhost:8800/resetpassword/" + userID, account);
            // await axios.put("http://localhost:8800/update/" + userID, account);
            console.log("send hopefully to newendpoint", account)

        } catch (err) {
            console.log(err);
        }
    }


    return (props.trigger) ? (
        <div style={popupStyle}>
            <div style={popupInnerStyle}>
                <button style={closeButtonStyle} onClick={() => props.setTrigger(false)}>
                    <CloseIcon sx={{ fontSize: 20 }}></CloseIcon>
                </button>
                {props.children}


                <div className="form-container">
                    <h3 className="titlehead">
                        Change your Password
                    </h3>

                    <form className="form"
                        onSubmit={changePassword}
                    >
                        <div className="form-group">
                            <label for="email">New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={account.password}
                                onChange={handleChange}
                                placeholder="Enter your new password"
                                required
                            />
                            <br></br>

                            {/* <label for="email">Confirm New Password</label>
                            <input
                                type="password"
                                id="conpassword"
                                name="confirmpassword"
                                placeholder="Try again, type your new password"
                            // required
                            /> */}
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
