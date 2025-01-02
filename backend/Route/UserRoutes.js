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
router.get("/check-has-errand/:id", userController.getCatcherHasErrand);
router.put("/has-errand/:id", userController.putCatcherHasErrand); // used for updating if errand is accepted
router.put("/has-done-errand/:id", userController.putCatcherHasDoneErrand); // used for updating if errand is done
router.put("/has-cancel-errand/:id", userController.putEmployerHasCancelErrand);
router.put("/catchers-done/:id", userController.putCatchersHasDoneErrand); // used for updating catcher/s if errand is done

// Verify email route
router.get("/verify-email", userController.verifyEmail);

module.exports = router;
