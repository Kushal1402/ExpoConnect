const express = require("express");
const router = express.Router();
const AdminController = require("../../controller/admin/admin");
const adminCheckAuth = require("../../middleware/admin-check-auth");

router.post("/addAdmin", adminCheckAuth, AdminController.createAdmin);

router.post("/login", AdminController.login);

router.put("/updateProfile", adminCheckAuth, AdminController.editAdmin);

router.post("/changePassword", adminCheckAuth, AdminController.changePassword);

router.get("/auth", adminCheckAuth, AdminController.auth);

module.exports = router;