// app.js

const express = require("express");
const UserRoutes = require("./Route/UserRoutes");

const app = express();

app.use("/user/", UserRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports;
