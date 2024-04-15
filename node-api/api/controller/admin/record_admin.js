const RecordsModel = require("../../models/records");
const mongoose = require('mongoose')
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const moment = require('moment');
const { storageRef } = require("../../config/firebaseConnection");

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

exports.generateCsv = async (req, res) => {
    try {
        const records = await RecordsModel.find().sort({ createdAt: -1 });

        if (records.length <= 0) {
            return res.status(404).send({
                message: "No data found",
            });
        }

        records.forEach(record => {
            record.contact_number = `${record.country_code} ${record.contact_number}`;
        });

        // Getting current date and time using Moment.js
        const dateTimeString = moment().format("YYYY-MM-DD_HH-mm-ss");

        // Setting FileName
        const fileName = `ExpoConnect_Record_List_${dateTimeString}.csv`;

        // Create CSV-String
        const csvStringifier = createCsvStringifier({
            header: [
                { id: 'user_name', title: 'Name' },
                { id: 'company_name', title: 'Company Name' },
                { id: 'position', title: 'Position' },
                { id: 'contact_number', title: 'Phone Number' },
                { id: 'email', title: 'Email' },
            ]
        });

        // Create CSV header by joining header strings
        const csvHeader = csvStringifier.getHeaderString();

        // Create CSV string by joining record strings        
        const csvString = csvStringifier.stringifyRecords(records);

        // Combine header row and CSV data
        const csvData = csvHeader + '\n' + csvString;
        // Convert CSV data to a Buffer
        const csvBuffer = Buffer.from(csvData);

        // Upload CSV to Firebase Storage
        const fileRef = storageRef.child(`records/${fileName}`);
        const uploadTask = fileRef.put(csvBuffer);

        let hostedFileURL;

        uploadTask.on('state_changed', snapshot => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        }, error => {
            console.error('Error uploading CSV:', error);
            return res.status(500).send({
                message: "Error occurred, Please try again later",
                error: error,
            });
        }, async () => {
            // Upload completed successfully
            hostedFileURL = await fileRef.getDownloadURL();
            return res.status(200).json({
                message: "CSV file generated successfully",
                generated_file: hostedFileURL,
                file_name: fileName
            });
        });        
    } catch (error) {
        console.log("Listing error", error);
        return res.status(500).send({
            message: "Error occurred, Please try again",
            error: error,
        });
    }
};