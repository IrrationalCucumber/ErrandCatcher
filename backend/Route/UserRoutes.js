// routes.js

const express = require("express");
const userController = require("../Controller/UserController");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.get("/sign-in/", userController.getSignIn);
router.get("/status/:id", userController.getStatus);
// Add more routes as needed...

module.exports = router;
