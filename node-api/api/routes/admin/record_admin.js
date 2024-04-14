const express = require("express");
const router = express.Router();

const AdminRecordController = require("../../controller/admin/record_admin");
const adminCheckAuth = require("../../middleware/admin-check-auth");

router.get("/listing", adminCheckAuth, AdminRecordController.getListing);

router.post("/edit-record/:record_id", adminCheckAuth, AdminRecordController.updateRecord);

module.exports = router;