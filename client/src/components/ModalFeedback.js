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
import Fade from '@mui/material/Fade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const ModalFeedback = (props) => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "none",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        textAlign: "center",
    };

    const IconComponent = props.icon || CheckCircleIcon; // Default to CheckCircleIcon

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
                        {/* custom props icon */}
                        <IconComponent
                            color={props.color}
                            sx={{ fontSize: 70 }}
                        />
                        {/* title header */}
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            color={props.colorText}
                            sx={{
                                fontWeight: "bold",
                                fontSize: 24,
                                mt: 2
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
                                display: "flex",
                                justifyContent: "center",
                                mt: 3
                            }}>
                            <Button
                                variant="contained"
                                color={props.color}
                                onClick={props.handleClose}
                                sx={{
                                    width: "180px",
                                    borderRadius: 8,
                                    padding: "5px",
                                    fontSize: "1.0rem",
                                }}
                            >
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
