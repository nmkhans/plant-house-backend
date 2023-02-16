const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    payment: {
        type: Number,
        required: true
    },
    paymentmethod: {
        type: String, 
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    paid: {
        type: Boolean,
        default: false
    }

}, { versionKey: false, timestamps: true })

const Order = mongoose.model("order", schema)
module.exports = Order