import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import "../pages/history.css";
import Navbar from "../components/Navbar/Navbar";

const History = () => {
  const { user } = useAuth();
  const userID = user.userID;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [userID]);

  return (
    <>
      <Navbar />
      <div className="history-container">
        <h1>Transaction History</h1>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => {
            const paidDate = new Date(transaction.paid).toLocaleString();

            return (
              <div className="transaction-card" key={index}>
                <div className="transaction-details">
                  <p>
                    <strong>Transaction ID:</strong> {transaction.checkoutId}
                  </p>
                  <p>
                    <strong>Payment Intent ID:</strong> {transaction.paymentId}
                  </p>
                  <p>
                    <strong>Date Paid:</strong> {paidDate}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${transaction.total}
                  </p>
                  <p>
                    <strong>Type:</strong> {transaction.type}
                  </p>
                  <p>
                    <strong>Description:</strong> {transaction.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </>
  );
};

export default History;
