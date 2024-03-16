const express = require("express");
const router = express.Router();

const RecordController = require("../../controller/front/record");

router.post("/form", RecordController.add);

module.exports = router;