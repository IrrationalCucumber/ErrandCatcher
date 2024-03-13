import mysql from "mysql";
//change here to connect to your local db account
function createDBConnection() {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SethNL99*",
    database: "errandcatcher",
  });

  // Connect to the database
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to the database");
  });

  return db;
}

export default createDBConnection;
