const express = require("express");
const { Isauthentication } = require("../middleware/isAuth");
const {
   accesChat,
   fetchChats,
   createGroupChat,
   renameGroup,
   addUserChat,
   removeUserChat,
} = require("../controller/chatController");
const router = express.Router();

router.route("/").post(Isauthentication, accesChat).get(Isauthentication, fetchChats);
router.route("/group").post(Isauthentication, createGroupChat);
router.route("/rename").patch(Isauthentication, renameGroup);
router.route("/groupadd").patch(Isauthentication, addUserChat);
router.route("/groupremove").patch(Isauthentication, removeUserChat);

module.exports = router;
