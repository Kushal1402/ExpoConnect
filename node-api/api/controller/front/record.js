const RecordsModel = require("../../models/records");
const helper = require("../../helper/helper");
const niv = require("node-input-validator");
const sendEmail = require('../../helper/email');

exports.add = async (req, res, next) => {
    const objValidation = new niv.Validator(req.body, {
        user_name: "required|maxLength:52",
        company_name: "required|maxLength:100",
        country_code: "required",
        contact_number: "required",
        email: "required|email"
    });

    const matched = await objValidation.check();
    if (!matched) {
        return res.status(422).send({
            message: "Validation error",
            errors: objValidation.errors,
        });
    };

    const { user_name, company_name, position, country_code, contact_number, email } = req.body;
    try {

        const sameEmail = await RecordsModel.findOne({ email: email });
        if (sameEmail && sameEmail !== undefined && sameEmail !== null) {
            return res.status(422).send({
                message: "Same email is associated with another record",
            })
        }

        let createObj = {
            user_name: user_name,
            company_name: company_name,
            position: position,
            country_code: country_code,
            contact_number: contact_number,
            email: email,
        };

        let result = new RecordsModel(createObj);
        result = await result.save();

        const subject = `ExpoConnect Company Profile`;
        await sendEmail.SendMail(email, subject, createObj);

        return res.status(200).send({
            message: "Your data has been successfully submitted",
            result: result,
        });
    } catch (error) {
        console.log("Add data error", error);
        return res.status(500).send({
            message: "Error occurred, Please try again",
            error: error,
        });
    }
}