const AdminModel = require("../../models/admin");
const niv = require("node-input-validator");
const Helper = require("../../helper/helper");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// create admin
exports.createAdmin = async (req, res) => {
    const objValidation = new niv.Validator(req.body, {
        adminName: "required|maxLength:55",
        email: "required"
    });

    const matched = await objValidation.check();
    if (!matched) {
        return res.status(422).send({
            message: "Validation error",
            errors: objValidation.errors,
        });
    }
    // if (matched) {
    //   const password = req.body.password;
    //   const confirm_pass = req.body.confirm_pass;
    //   if (password != confirm_pass) {
    //     return res.status(422).send({
    //       message: "Password does not match",
    //     });
    //   }
    // }

    try {
        const adminResultEmail = await AdminModel.findOne({
            email: req.body.email,
            status: {
                $in: [1, 2],
            },
        });

        if (adminResultEmail) {
            return res.status(409).send({
                message: "Admin email already exists",
            });
        }

        let passwordBcrpy;

        if (req.body.password) {
            passwordBcrpy = await bcrypt.hash(req.body.password, 10);
        } else {
            const randomPassword = Helper.generateRandomString(8, false);
            passwordBcrpy = await bcrypt.hash(randomPassword, 10);
        }

        const newAdmin = new AdminModel({
            adminName: req.body.adminName,
            email: req.body.email,
            password: passwordBcrpy,
        });

        const result = await newAdmin.save();

        // JWT token generate
        const token = jwt.sign(
            {
                email: result.email,
                id: result._id,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "10d",
            }
        );
        return res.status(201).send({
            message: "New Admin created",
            token: token,
            user: result,
        });
    } catch (err) {
        return res.status(500).send({
            message: "Error occurred, Please try again later",
            error: err,
        });
    }
};

// Login Admin
exports.login = async (req, res, next) => {
    const objValidation = new niv.Validator(req.body, {
        email: "required",
        password: "required",
    });
    const matched = await objValidation.check();

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors });
    }

    try {
        const admin = await AdminModel.findOne({ email: req.body.email });
        if (admin === null) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const passwordResult = await bcrypt.compare(
            req.body.password,
            admin.password
        );
        if (passwordResult === false) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                email: admin.email,
                id: admin._id,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "10d",
            }
        );

        if (admin.profilePic == "") {
            admin.profilePic = ""
        } else {
            admin.profilePic = admin.profilePic
        }

        return res.status(200).json({
            message: "Auth Successfull",
            token: token,
            admin: admin,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error occurred, Please try again later",
            error: err,
        });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const objValidation = new niv.Validator(req.body, {
        new_password: "required|minLength:6",
        old_password: "required|minLength:4",
    });
    const matched = await objValidation.check();

    if (!matched) {
        return res.status(422).send({
            message: "Validation error",
            errors: objValidation.errors,
        });
    }
    let { new_password, old_password } = req.body;
    const id = req.userData.id;

    try {
        const admin = await AdminModel.findById(id);
        const compare = await bcrypt.compare(old_password, admin.password);
        if (!compare) {
            return res.status(401).send({ message: "password not match" });
        }
        const hash = await bcrypt.hash(new_password, 10);

        const result = await AdminModel.findByIdAndUpdate(id, {
            $set: {
                password: hash,
            },
        });
        return res.status(200).json({
            message: "Password changed successfully",
            admin: result,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error occurred, Please try again later",
        });
    }
};

// edit admin
exports.editAdmin = async (req, res) => {
    const id = req.userData.id;

    const { name, email, password } = req.body;
    try {
        const updateObj = {};        
        if (name) updateObj.adminName = name;
        if (password) updateObj.password = await bcrypt.hash(password, 10);
        // if (email) updateObj.email = email;
        if (email) {
            const adminEmailResult = await AdminModel.findOne({
                _id: { $ne: mongoose.Types.ObjectId(id) },
                email: req.body.email,
                status: {
                    $in: [1, 2],
                },
            });
            if (adminEmailResult) {
                return res.status(409).send({
                    message: "Email already exists",
                });
            } else {
                updateObj.email = email;
            }
        }
        const result = await AdminModel.findByIdAndUpdate(
            id,
            {
                $set: updateObj,
            },
            {
                new: true,
            }
        );

        if (result.profilePic == "") {
            result.profilePic = ""
        } else {
            result.profilePic = result.profilePic
        }

        return res.status(200).json({
            message: "Admin has been successfully updated",
            result: result,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error occurred, Please try again later",
            error: err,
        });
    }
};

//  check auth
exports.auth = async (req, res) => {
    try {
        let admin = await AdminModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.userData.id) } },
            {
                $project: {
                    adminName: 1,
                    email: 1,
                    password: 1,
                    profilePic: 1,
                    status: 1,
                    createdAt: 1,
                },
            },
        ]);
        if (admin[0].profilePic == "") {
            admin[0].profilePic = ""
        } else {
            admin[0].profilePic = admin[0].profilePic
        }
        return res.status(200).send({
            message: "Admin auth retrived",
            result: admin[0],
        });
    } catch (err) {
        console.log("err:", err)
        const request = req;
        Helper.writeErrorLog(request, err);
        return res.status(500).json({
            message: "Error occurred, Please try again later",
            error: err,
        });
    }
};