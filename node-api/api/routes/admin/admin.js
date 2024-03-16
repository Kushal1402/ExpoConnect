const express = require("express");
const router = express.Router();
const AdminController = require("../../controller/admin/admin");
const adminCheckAuth = require("../../middleware/admin-check-auth");
const makeRequest = require("../../middleware/make-request");

router.post("/addAdmin", adminCheckAuth, makeRequest, AdminController.createAdmin);

router.post("/login", makeRequest, AdminController.login);

router.put("/updateProfile", adminCheckAuth, makeRequest, AdminController.editAdmin);

router.post("/changePassword", adminCheckAuth, makeRequest, AdminController.changePassword);

router.get("/auth", adminCheckAuth, makeRequest, AdminController.auth);

module.exports = router;