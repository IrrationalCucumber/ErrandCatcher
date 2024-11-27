import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

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


    return (props.trigger) ? (
        <div style={popupStyle}>
            <div style={popupInnerStyle}>
                <button style={closeButtonStyle} onClick={() => props.setTrigger(false)}>
                    <CloseIcon sx={{ fontSize: 20 }}></CloseIcon>
                </button>
                {props.children}


                <div class="form-container">
                    <div class="titlehead">
                        Change your Password
                    </div>

                    <form class="form">
                        <div class="form-group">
                            <label for="email">New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="newpassword"
                                placeholder="Enter your new password"
                                required
                            />
                            <br></br>

                            <label for="email">Confirm New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="confirmpassword"
                                placeholder="Try again, type your new password"
                                required
                            />
                        </div>
                        <button class="form-submit-btn"
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
