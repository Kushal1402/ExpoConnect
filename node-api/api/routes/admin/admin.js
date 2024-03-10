const express = require("express");
const router = express.Router();
const AdminController = require("../../controller/admin/admin");
const adminCheckAuth = require("../../middleware/admin-check-auth");
const multer = require("multer");
const Helper = require("../../helper/helper");
const makeRequest = require("../../middleware/make-request");
const fs = require("fs")
var folderName = "./uploads/admin/";
try {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
    }
} catch (err) {
    console.error(err);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folderName);
    },
    filename: function (req, file, cb) {
        cb(null, Helper.generateRandomString(5) + "-" + file.originalname);
    },
});


const fileFilter = (req, file, cb) => {
    // Reject file
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/gif" ||
        file.mimetype == "image/svg+xml"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg .gif and .jpeg format allowed!"));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});

router.post("/addAdmin", upload.single("profilePic"), adminCheckAuth, makeRequest, AdminController.createAdmin);

router.post("/login", makeRequest, AdminController.login);

router.put("/updateProfile", adminCheckAuth, upload.single("profilePic"), makeRequest, AdminController.editAdmin);

router.post("/changePassword", adminCheckAuth, makeRequest, AdminController.changePassword);

router.get("/auth", adminCheckAuth, makeRequest, AdminController.auth);

module.exports = router;