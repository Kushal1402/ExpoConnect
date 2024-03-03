const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const dbConnection = require("./api/config/connection");

mongoose.Promise = global.Promise;
app.use(cors(
    {
        origin : ["https://expo-connect-backend.vercel.app"],
        methods : ["GET", "POST", "PUT"],
        credentials : true
    }
));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/cancel", (req, res) => {
    console.log("cancel");
    console.log(req);
});

app.get("/", (req, res) => {
    console.log("success");
    console.log(req);
    res.json("Api success")
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