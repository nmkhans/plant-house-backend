const express = require("express")
const router = express.Router()
const orderController = require("../controllers/order.controller")

//? create new order
/**
 * @api (post) //create
 * @apiDescription create new product
 * @apiPermission user
 * 
*/
router.post("/create", orderController.createOrder)

module.exports = router