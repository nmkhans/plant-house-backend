const express = require("express")
const router = express.Router()
const productController = require("../controllers/product.controller")

//? create a new product
/**
 * @api (post) /product/create
 * @apiDescription create new product
 * @apiPermission admin
 * 
*/
router.post("/create", productController.createProduct)

module.exports = router