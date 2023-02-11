const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {versionKey: false, timestamps: true})

const Category = mongoose.model("category", schema);
module.exports = Category