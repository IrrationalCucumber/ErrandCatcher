import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Docu(props) {
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
    };

    const popupInnerStyle = {
        position: 'relative',
        padding: '32px',
        width: '100%',
        maxWidth: '900px',
        height: '70vh',
        overflowY: 'auto',
        backgroundColor: '#FFF',
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
            </div>
        </div>
    ) : null;
}

export default Docu;