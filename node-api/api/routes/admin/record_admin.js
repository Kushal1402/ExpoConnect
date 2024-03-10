const express = require("express");
const router = express.Router();

const AdminRecordController = require("../../controller/admin/record_admin");
const adminCheckAuth = require("../../middleware/admin-check-auth");
const makeRequest = require("../../middleware/make-request");

router.get("/listing", makeRequest, adminCheckAuth, AdminRecordController.getListing);

module.exports = router;