const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const dbConnection = require("./api/config/connection");

mongoose.Promise = global.Promise;
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/cancel", (req, res) => {
    console.log("cancel");
    console.log(req);
});

app.use("/success", (req, res) => {
    console.log("success");
    console.log(req);
});

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
    });
});

module.exports = app;