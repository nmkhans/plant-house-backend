const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/category.controller")

router
  .route("/")
  /**
   * @api (get) /categories 
   * @apiDescription get all categories
   * @apiPermission users
   * 
  */
  .get(categoryController.getCategories)
  /**
    * @api (post) /categories 
    * @apiDescription create new categories
    * @apiPermission admin
    * 
    * @apiHeader Authorization admins's access token
    * 
    * @apiError (unauthorized 401) Unauthorized access. only authenticated admin can access 
    * @apiError (forbidden 403) Forbidden access. only admin can access 
    * 
  */
  .post(categoryController.createCategories)
  /**
    * @api (delete) /categories/:id
    * @apiDescription delete categories
    * @apiPermission admin
    * 
    * @apiHeader Authorization admins's access token
    * 
    * @apiError (unauthorized 401) Unauthorized access. only authenticated admin can access 
    * @apiError (forbidden 403) Forbidden access. only admin can access 
    * 
  */

router.delete("/delete/:id", categoryController.deleteCategory)

module.exports = router