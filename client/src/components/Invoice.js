import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Stack from "@mui/icons-material/Stack";

// Sample invoice data for simulation only for testing and display
const Invoice = ({ open, onClose, userID }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8800/transactions/${userID}`
          );
          setTransactions(response.data);
          setLoading(false);
        } catch (err) {
          console.log("Error fetching transactions:", err);
          setError(err);
          setLoading(false);
        }
      };
      fetchTransactions();
    }
  }, [open, userID]);

  if (loading && open) {
    return <div>Loading...</div>;
  }

  if (error && open) {
    return <div>Error fetching data</div>;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="invoice-modal"
      aria-describedby="invoice-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <h2>Errand Catcher</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* <h5 id="invoice-modal">User Invoice</h5>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div style={{ margin: "20px" }} key={index}>
              <hr />
              <div style={{ padding: "4px" }}>
                <p>Transaction ID: {transaction.checkoutId}</p>
                <p>Payment Intent ID: {transaction.paymentId}</p>
                <p>Date Paid: {transaction.paid}</p>
                <p>Total Price: {transaction.total}</p>
                <p>Type: {transaction.type}</p>
                <p>Description: {transaction.description}</p>
              </div>
              <hr />
            </div>
          )) */}
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => {
            const paidDate = new Date(transaction.paid).toLocaleString(); // Convert the timestamp to a human-readable format

            return (
              <div style={{ margin: "20px" }} key={index}>
                <hr />
                <div style={{ padding: "4px" }}>
                  <p>Transaction ID: {transaction.checkoutId}</p>
                  <p>Payment Intent ID: {transaction.paymentId}</p>
                  <p>Date Paid: {paidDate}</p>{" "}
                  {/* Display the formatted date */}
                  <p>Total Price: {transaction.total}</p>
                  <p>Type: {transaction.type}</p>
                  <p>Description: {transaction.description}</p>
                </div>
                <hr />
              </div>
            );
          })
        ) : (
          <p>No transactions found.</p>
        )}
      </Box>
    </Modal>
  );
};
export default Invoice;
