const User = require("../models/user.model")
const Order = require("../models/order.model")

module.exports.adminSummery = async (req, res, next) => {
  try {
    const users = await User.find().count()
    const orders = await Order.find().count()
    const pendingOrders = await Order.find({ status: "pending" }).count()
    const deliveredOrders = await Order.find({ status: "delivered" }).count()

    res.status(200).json({
      success: true,
      message: "All summery info",
      data: {
        users,
        orders,
        pendingOrders,
        deliveredOrders
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports.userSummery = async (req, res) => {
  try {
    const { email } = req.params;

    const pendingOrders = await Order.find({
      email: email,
      status: "pending"
    }).count()
    const deliveredOrders = await Order.find({
      email: email,
      status: "delivered"
    }).count()

    res.status(200).json({
      success: true,
      message: "All summery info",
      data: {
        pendingOrders,
        deliveredOrders
      }
    })

  } catch (error) {

  }
}