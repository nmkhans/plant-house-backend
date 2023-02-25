const express = require("express")
const summeryController = require("../controllers/summery.controller")
const router = express.Router()

router.get("/", summeryController.adminSummery)

router.get("/:email", summeryController.userSummery)

module.exports = router