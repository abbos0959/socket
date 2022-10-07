const express = require("express");
const IsAuth=require("../middleware/isAuth")

const userController = require("../controller/userController");
const router = express.Router();

router.route("/signup").post(userController.registerUser);
router.route("/login").post(userController.Login);

router.route("/").get( IsAuth.Isauthentication,userController.getAllUser);

module.exports = router;
