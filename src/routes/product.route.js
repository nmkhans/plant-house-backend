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

//? get single product
/**
 * @api (get) /:id
 * @apiDescription single product data
 * @apiPermission users
 * 
*/
router.get("/:id", productController.getSingleProduct)

//? get filtered product
/**
 * @api (get) /product/filter 
 * @apiDescription get filtered products
 * @apiPermission users
 * 
*/
router.get("/filter/search", productController.filterBySearch)

//? get category by filter
/**
 * @api (get) /product/filter/category 
 * @apiDescription get filtered products by category
 * @apiPermission users
 * 
*/
router.get("/filter/category", productController.filterByCategory)

//? restock product
router.patch("/restock/:id", productController.restockProduct)

//? delete product
router.delete("/delete/:id", productController.deleteProduct)

//? get reviews
router.get("/get/reviews", productController.getReviews)

//? get recomended products
router.get("/get/recomended", productController.getRecomendedProducts)

module.exports = router