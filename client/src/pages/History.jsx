import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import "../pages/history.css";
// import Navbar from "../components/Navbar/Navbar";
import NavbarPage from "../components/Navbar/NavBarPage";

const History = () => {
  const { user } = useAuth();
  const userID = user.userID;
  const [transactions, setTransactions] = useState([]);


  // tesing data
  const sampletran = [
    {
      checkoutId: "CHK123456789",
      paymentId: "PMT987654321",
      paid: "2024-09-11T14:30:00Z",
      total: 150.0,
      type: "Indoor-Services",
      description: "Let him cook🍔",
    },
    {
      checkoutId: "CHK223344556",
      paymentId: "PMT876543210",
      paid: "2024-09-10T11:45:00Z",
      total: 75.0,
      type: "Delivery",
      description: "Grocery delivery",
    },
    {
      checkoutId: "CHK334455667",
      paymentId: "PMT765432109",
      paid: "2024-09-09T09:20:00Z",
      total: 200.0,
      type: "Transportation",
      description: "Airport drop-off",
    },
    {
      checkoutId: "CHK445566778",
      paymentId: "PMT654321098",
      paid: "2024-09-08T16:10:00Z",
      total: 50.0,
      type: "Outdoor-Service",
      description: "Dog walking service",
    },
    {
      checkoutId: "CHK556677889",
      paymentId: "PMT543210987",
      paid: "2024-09-07T13:00:00Z",
      total: 120.0,
      type: "Service",
      description: "Home organizing service",
    },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:8800/transactions/${userID}`
        // );
        // setTransactions(response.data);
        // setLoading(false);

        // choose if the user is Employer otherwise Catcher
        const endpoint =
          user.userType === "Employer"
            ? `http://localhost:8800/transactionsEmp/${userID}`
            : `http://localhost:8800/transactionsCat/${userID}`;

        const response = await axios.get(endpoint);
        setTransactions(response.data);

      } catch (err) {
        console.log("Error fetching transactions:", err);


      }
    };
    fetchTransactions();
  }, [userID, user.userType]);

  return (
    <>
      {/* <Navbar /> */}
      <NavbarPage />
      <div className="history-container">
        <h1>Transaction History</h1>

        {/* apply testing data */}
        {/* {sampletran.length > 0 ? (
          sampletran.map((transaction, index) => { */}

        {/* data from database */}
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => {

            // convert to centavo
            const amountInCents = (transaction.total / 100).toFixed(2);

            console.log(amountInCents)

            // convert to peso php
            const priceInPHP = new Intl.NumberFormat('en-PH',
              {
                style: 'currency',
                currency: 'PHP'
              }
            ).format(amountInCents);

            console.log(priceInPHP)

            const paidDate = new Date(transaction.paid).toLocaleString();

            console.log(paidDate);

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
                    <strong>Total Price:</strong> {priceInPHP}
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
