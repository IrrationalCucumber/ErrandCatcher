// routes.js

const express = require("express");
const userController = require("../Controller/UserController");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.get("/sign-in/", userController.getSignIn);
router.get("/status/:id", userController.getStatus);
router.get("/username/:id", userController.getUsername);
router.get("/type/:id", userController.getType);
router.put("/update/:id", userController.putUpdateUser);
// Add more routes as needed...

module.exports = router;
