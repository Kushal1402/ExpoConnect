const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const dbConnection = require("./api/config/connection");

const AdminRoutes = require("./api/routes/admin/admin");
const AdminRecordRoutes = require("./api/routes/admin/record_admin");
const ExhibitionForm = require("./api/routes/front/record");

mongoose.Promise = global.Promise;
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Admin
app.use("/api/admin", AdminRoutes);
app.use("/api/admin/record", AdminRecordRoutes);

// For Front
app.use("/api/record", ExhibitionForm);

app.get("/", (req, res) => {
    console.log("success");
    res.send(`Api running .... connected db : ${process.env.MONGO_HOST}`)
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server started at : ' + port)
})