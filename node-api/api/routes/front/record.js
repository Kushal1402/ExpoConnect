const express = require("express");
const router = express.Router();

const RecordController = require("../../controller/front/record");
const makeRequest = require("../../middleware/make-request");

router.post("/form", makeRequest, RecordController.add);

module.exports = router;