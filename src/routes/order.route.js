const express = require("express")
const router = express.Router()
const orderController = require("../controllers/order.controller")

//? create new order
/**
 * @api (post) /create 
 * @apiDescription create new product
 * @apiPermission user
 * 
*/
router.post("/create", orderController.createOrder)

//? get all orders
/**
 * @api (get) /all
 * @apiDescription get all orders
 * @apiPermission user, admin
 * 
*/
router.get("/all", orderController.getAllOrders)

//? confirm payment
/**
 * @api (patch) /confirm-payment
 * @apiDescription confirm payment
 * @apiPermission admin
 * 
*/
router.patch("/confirm-payment/:id", orderController.comfirmPayment)

//? update status
/**
 * @api (patch) /update-status
 * @apiDescription update order status
 * @apiPermission admin
 * 
*/
router.patch("/update-status/:id", orderController.updateStatus)

//? delete order
router.delete("/delete/:id", orderController.deleteOrder)

//? get user orders
router.get("/user/:email", orderController.getOrderByUser)

//? get single order
router.get("/:id", orderController.getSingleOrder)

//? add a review
router.post("/review/add/:id", orderController.addReview)


module.exports = router