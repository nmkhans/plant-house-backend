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