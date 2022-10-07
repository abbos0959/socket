require("dotenv").config();
const express = require("express");
const app = express();
const CookieParser = require("cookie-parser");
const cors = require("cors");

// const Cookieparser = require("cookie-parser");
require("colors");
// require("dotenv").config();
const userRouter = require("../router/userRouter");

const errorHandler = require("../controller/errorController");
const DB = require("../connect/db");
DB();

// app.use(express.json());
app.use(express.json());
app.use(CookieParser());
app.use(cors());
app.use("/api/user", userRouter);

app.use(errorHandler);
app.use("*", (req, res) => {
   res.status(404).json({
      error: `bunday url mavjud emas ${req.originalUrl}`,
   });
});

module.exports = app;
