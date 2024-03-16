const RecordsModel = require("../../models/records");
const helper = require("../../helper/helper");

exports.getListing = async (req, res, next) => {

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
        console.log("search:", search)
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