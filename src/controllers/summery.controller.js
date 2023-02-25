const User = require("../models/user.model")
const Order = require("../models/order.model")

const summery = async (req, res) => {
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
}

module.exports = summery