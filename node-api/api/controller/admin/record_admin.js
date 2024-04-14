const RecordsModel = require("../../models/records");
const helper = require("../../helper/helper");
const mongoose = require('mongoose')

exports.getListing = async (req, res) => {

    let { page, limit, search } = req.query;
    if ([1, "", 0, "undefined", "null", undefined, null].includes(page)) {
        page = 1;
    }
    if (["", "undefined", "null", undefined, null].includes(search)) {
        search = "";
    }
    if ([1, "", 0, "undefined", "null", undefined, null].includes(limit)) {
        limit = 10;
    }

    var options = {
        page: page,
        limit: limit,
    };

    let matchObj = {};

    if (search) {
        matchObj.$or = [
            { user_name: { $regex: search, $options: "i" } },
            { company_name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { position: { $regex: search, $options: "i" } },
            { contact_number: { $regex: search, $options: "i" } }
        ]
    };

    try {
        const postAggregatedRecords = RecordsModel.aggregate([
            {
                $match: matchObj,
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $project: {
                    user_name: 1,
                    company_name: 1,
                    position: 1,
                    country_code: 1,
                    contact_number: 1,
                    email: 1,
                    createdAt: 1,
                },
            },
        ]);

        const result = await RecordsModel.aggregatePaginate(
            postAggregatedRecords,
            options
        );

        return res.status(200).json({
            message: "Records has been retrieved",
            result: result,
        });
    } catch (error) {
        console.log("Listing error", error);
        return res.status(500).send({
            message: "Error occurred, Please try again",
            error: error,
        });
    }
}

exports.updateRecord = async (req, res) => {
    const record_id = req?.params?.record_id;

    if (!(mongoose.isObjectIdOrHexString(record_id)) || record_id === "" || record_id === null || record_id === undefined) {
        return res.status(404).send({
            message: "Record id mismatch, please try again later",
        });
    }

    try {
        const { user_name, company_name, position, country_code, contact_number, email } = req.body;

        const updateObj = {};

        if (user_name) updateObj.user_name = user_name;
        if (company_name) updateObj.company_name = company_name;
        if (position) updateObj.position = position;
        if (country_code) updateObj.country_code = country_code;
        if (contact_number) updateObj.contact_number = contact_number;
        if (email) updateObj.email = email;

        const result = await RecordsModel.findByIdAndUpdate(
            record_id,
            {
                $set: updateObj,
            },
            {
                new: true
            }
        );

        return res.status(200).send({
            message: "Record succesfully updated",
            result
        });
    } catch (error) {
        console.log("Update record error", error);
        return res.status(500).send({
            message: "Error occurred, Please try again",
            error: error,
        });
    }
}