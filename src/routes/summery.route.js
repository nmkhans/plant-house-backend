const express = require("express")
const summery = require("../controllers/summery.controller")
const router = express.Router()

router.get("/", summery)

module.exports = router