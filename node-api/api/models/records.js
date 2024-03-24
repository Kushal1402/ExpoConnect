const mongoose = require('mongoose')
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let mongoosePaginate = require("mongoose-paginate-v2");

const recordsSchema = mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
        },
        company_name: {
            type: String,
            default: "",
        },
        position: {
            type: String,
            default: "",
        },
        country_code: {
            type: String,
            default: "",
        },
        contact_number: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

recordsSchema.index({ user_name: 1 });
recordsSchema.index({ company_name: 1 });
recordsSchema.index({ position: 1 });
recordsSchema.index({ contact_number: 1 });
recordsSchema.index({ email: 1 });
recordsSchema.index({ contact_number: -1 });

recordsSchema.plugin(aggregatePaginate)
recordsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('records', recordsSchema)