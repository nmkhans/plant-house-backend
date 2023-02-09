const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")

router
    .route("/")
    /**
     * @api (get) /user 
     * @apiDescription login a user
     * @apiPermission users, admins
     * 
    */
    .post(userController.loginUser)
    /**
     * @api (post) /user 
     * @apiDescription register a new user
     * @apiPermission users, admins
     * 
    */
    .post(userController.registerUser)

module.exports = router