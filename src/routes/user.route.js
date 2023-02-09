const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")


//? register a user
/**
 * @api (post) /user/register 
 * @apiDescription register a new user
 * @apiPermission users, admins
 * 
*/
router.post("/register", userController.registerUser)

//? login a user
/**
 * @api (post) /user/login 
 * @apiDescription login a user
 * @apiPermission users, admins 
 * 
*/
router.post("/login", userController.loginUser)

//? update a user
/**
 * @api (patch) /user/update 
 * @apiDescription update a user
 * @apiPermission users, admins 
 * 
*/
router.patch("/update/:id", userController.updateUser)


module.exports = router