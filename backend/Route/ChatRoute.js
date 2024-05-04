const express = require("express");
const chatcontoller = require("../Controller/ChatController.js");

const router = express.Router();

router.get("/chat/:id/:userid", chatcontoller.fetchChatById);

module.exports = router;
