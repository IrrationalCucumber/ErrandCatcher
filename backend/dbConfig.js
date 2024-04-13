// import mysql from "mysql";
// //change here to connect to your local db account
// function createDBConnection() {
//   const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "SethNL99*",
//     database: "errandcatcher",
//   });

//   // Connect to the database
//   db.connect((err) => {
//     if (err) {
//       console.error("Error connecting to database:", err);
//       return;
//     }
//     console.log("Connected to the database");
//   });

//   return db;
// }

// export default createDBConnection;
// dbConfig.js

const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "SethNL99*",
  database: "errandcatcher",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
