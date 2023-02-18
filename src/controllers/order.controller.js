const Order = require("../models/order.model");
const sendMail = require("../utils/sendMail");

module.exports.createOrder = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Order.create(data)

        sendMail({
            to: data.email,
            subject: "Confirmation for your order.",
            body: `<h2>Hello ${data.name}</h2><br><p>Your order has been placed. your order id is ${result._id}.<br> you can track your order from your dashboard. Once you recive order and make payment. Your order status will be updated.</p><br><br><p>Thanks for purchasing form us.</p>`
        })

        res.status(201).json({
            success: true,
            message: "Order has beed placed.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const result = await Order.find();

        res.status(200).json({
            success: true,
            message: "All order data",
            data: result
        })


    } catch (error) {
        next(error)
    }
}

module.exports.getOrderByUser = async (req, res, next) => {
    try {
        const { email } = req.params;
        const result = await Order.find({email: email});
        
        res.status(200).json({
            success: true,
            message: "Orders list",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.comfirmPayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateDoc = {
            $set: {
                paid: true
            }
        }

        const result = await Order.updateOne({ _id: id }, updateDoc)

        res.status(200).json({
            success: true,
            message: "Payment successfull",
            data: result
        })


    } catch (error) {
        next(error)
    }
}

module.exports.updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updateDoc = {
            $set: {
                status: status
            }
        }

        const result = await Order.updateOne({ _id: id }, updateDoc)

        const order = await Order.findOne({ _id: id })

        sendMail({
            to: order?.email,
            subject: "Your order has been delivered.",
            body: `<h2>Hello ${order.name}</h2><br><p>Your order has been delivered and payment was successfull. your order id is ${order._id}.<br></p><br><br><p>Thanks for purchasing form us.</p>`
        })

        res.status(200).json({
            success: true,
            message: "Staus updated.",
            data: result
        })


    } catch (error) {
        next(error)
    }
}

module.exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({ _id: id })

        sendMail({
            to: order?.email,
            subject: "Your order has been canceled.",
            body: `<h2>Hello ${order.name}</h2><br><p>Your order has been canceled due to some issue. your order id was ${order._id}. please reorder.<br></p><br><br><p>Thanks for purchasing form us.</p>`
        })

        const result = await Order.deleteOne({ _id: id })

        res.status(200).json({
            success: true,
            message: "Staus updated.",
            data: result
        })


    } catch (error) {
        next(error)
    }
}