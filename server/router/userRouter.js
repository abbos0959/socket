const express = require("express");

const userController = require("../controller/userController");
const router = express.Router();

router.route("/signup").post(userController.registerUser);
router.route("/login").post(userController.Login);

module.exports = router;
