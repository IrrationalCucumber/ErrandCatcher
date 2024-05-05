const express = require("express");
const chatcontoller = require("../Controller/ChatController.js");

const router = express.Router();

router.get("/chat/:id/:userid", chatcontoller.fetchChatById); // to retrieve chat of user
router.post("/new-chat", chatcontoller.postNewChat); // add new chat between user
router.post("/add-convo", chatcontoller.postConvo); // add a convo to a chat between user

module.exports = router;
