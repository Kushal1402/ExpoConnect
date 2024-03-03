const mongoose = require('mongoose')
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let mongoosePaginate = require("mongoose-paginate-v2");

const adminSchema = mongoose.Schema(
    {
        adminName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ""
        },
        status: {
            type: Number,
            default: 1, // 1=active, 2=inactive 3=deleted
        },
    },
    { timestamps: true }
)

adminSchema.index({ status: -1 });

adminSchema.plugin(aggregatePaginate);
adminSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('admin', adminSchema)