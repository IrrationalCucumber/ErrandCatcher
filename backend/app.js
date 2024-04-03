// app.js

const express = require("express");
const UserRoutes = require("./Route/UserRoutes");
const db = require("./dbConfig.js");

const app = express();
//use routes for each modules
app.use("/user", UserRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to update records with expired deadlines
const updateExpiredRecords = () => {
  const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query = `
      UPDATE commission
      SET commissionStatus = 'Expired'
      WHERE commissionDeadline < '${currentTime}' AND commissionStatus = 'Available'
      
    `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error updating records:", error);
    } else {
      console.log(`${results.affectedRows} errand updated.`);
    }
  });
};

// Schedule the update function to run every minute
const scheduler = setInterval(updateExpiredRecords, 10000);

// Stop the scheduler after a certain duration (optional)
// setTimeout(() => {
//   clearInterval(scheduler);
//   console.log('Scheduler stopped.');
// }, 3600000); // Stop after 1 hour (3600 seconds * 1000 milliseconds)
module.exports;
