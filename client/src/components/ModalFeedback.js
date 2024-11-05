/**
 * WRITTEN BY: MONDE
 * 5/11/24
 * Component pop up modal message
 */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Fade from '@mui/material/Fade';


const ModalFeedback = (props) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
    };

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={props.open}>
                    <Box
                        sx={style}
                    >
                        <CheckCircleIcon
                            color="success"
                            sx={{ fontSize: 50 }}
                        />
                        {/* title header */}
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            sx={{
                                color: 'green',
                                fontWeight: 'bold'
                            }}>
                            {props.headerMes}
                        </Typography>

                        {/* content message */}
                        <Typography
                            id="modal-modal-description"
                            variant="h6"
                            component="h2"
                            sx={{ mt: 2 }}>
                            {props.contentMes}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 3
                            }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={props.handleClose}>
                                OKAY
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalFeedback;
