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

//? get all product
/**
 * @api (get) /product/all 
 * @apiDescription get all products
 * @apiPermission users
 * 
*/
router.get("/all", productController.getAllProduct)

//? get filtered product
/**
 * @api (get) /product/filter 
 * @apiDescription get filtered products
 * @apiPermission users
 * 
*/
router.get("/filter", productController.filteredProduct)

module.exports = router