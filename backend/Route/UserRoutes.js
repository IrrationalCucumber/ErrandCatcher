// routes.js

const express = require("express");
const userController = require("../Controller/UserController");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUserById);
router.get("/sign-in", userController.getSignIn);
router.get("/status/:id", userController.getStatus);
router.get("/username/:id", userController.getUsername);
router.get("/get-type/:id", userController.getType);
router.put("/update/:id", userController.putUpdateUser);
router.post("/update-pic/:id", userController.uploadProfileImage);
router.put("/resetpassword/:id", userController.putResetPassword);
// for admin
//change userStatus
router.put(
  "/change-status/:id/:status",
  userController.putChangeStatusByUserID
);
router.post("/sign-up/", userController.postSignUp);
// Add more routes as needed...
router.get("/search-user/", userController.getSearchByTerm);

module.exports = router;
