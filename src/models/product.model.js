const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    reviews: {
        type: Array,
        default: []
    }

}, { versionKey: false, timestamps: true })

const Product = mongoose.model("product", schema)
module.exports = Product