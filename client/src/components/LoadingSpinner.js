import React from 'react';
import {
    Backdrop,
    CircularProgress,
    Typography
} from '@mui/material';

const LoadingBackdrop = (props) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
            open={props.open}
        >
            <CircularProgress
                color="inherit"
                size="6rem"
                sx={{
                    marginBottom: '32px'
                }} />
            <Typography variant="h5">
                {props.icons} {props.text}
            </Typography>      
        </Backdrop>
    );
};

export default LoadingBackdrop;
