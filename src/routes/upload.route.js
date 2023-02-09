const express = require("express")
const router = express.Router()
const handleUpload = require("../controllers/upload.controller")
const upload = require("../middleware/uploadImage")

router.post("/", upload.single("image"), handleUpload)

module.exports = router