//Modal for the invoice
//data be use in here would be get in the app because the payment is seen in the terminal
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Invoice = ({ open, onClose }) => {
    
  const handleClose = () => {
    onClose();
  };

  // Sample invoice data for simulation only for the testing and display
//   const invoice = {
//     address: "123 Main St, Anytown",
//     description: "Services rendered",
//     attributes: {
//       line_items: [
//         { name: "Service A", quantity: 1, amount: 5000 }
//       ]
//     },
//     merchant: "Errand Catcher",
//     payment_method_types: ["Gcash"],
//     payment_intent: { id: "pi_123456789" } // Sample payment intent ID
//   };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="invoice-modal"
      aria-describedby="invoice-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h2>Errand Catcher</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <h5 id="invoice-modal">User Invoice</h5>
        {invoice && (
          <div>
            <hr/>
            <p>Date: {invoice.date}</p>
            <p>Invoice No.  : {invoice.payment_intent.id}</p>
            <hr/>
            <p style={{fontWeight:"bold", fontSize:"20px"}}>Invoiced to</p>
            <p>User Name  :</p>
            <p>Address  : {invoice.address}</p>
            <p>Payment Method  : {invoice.payment_method_types.join(', ')}</p>
            <hr/>

            {invoice.attributes.line_items.map((item, index) => (
              <div key={index}>
                <p style={{ textAlign: "right", width: "85%" }}> Type of Service  : <p style={{display: "inline-block"}}>{item.name}</p></p>
                <p style={{ textAlign: "right", width: "75%" }}>Total Kilometers  : <p style={{display: "inline-block"}}>{item.quantity}</p></p>
                <p style={{ textAlign: "right", width: "80%" }}>Price per Kilometers  :  {item.amount}</p>
                <hr/>
                <p style={{ textAlign: "right", width: "%" }}>Total Price  : ₱ {item.amount / 100}</p>
              </div>
            ))}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default Invoice;
