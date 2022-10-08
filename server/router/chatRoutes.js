const express = require("express");
const { Isauthentication } = require("../middleware/isAuth");
const { accesChat, fetchChats, createGroupChat } = require("../controller/chatController");
const router = express.Router();

router.route("/").post(Isauthentication, accesChat).get(Isauthentication, fetchChats);
router.route("/group").post(Isauthentication, createGroupChat);

module.exports = router;
