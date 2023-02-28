const express = require("express")
require("dotenv").config()
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")

const handleError = require("./src/middleware/handleError")
const defaultRoute = require("./src/routes/default.route")
const userRoute = require("./src/routes/user.route")
const productRoute = require("./src/routes/product.route")
const uploadRoute = require("./src/routes/upload.route")
const categoryRoute = require("./src/routes/category.route")
const orderRoute = require("./src/routes/order.route")
const summeryRoute = require("./src/routes/summery.route")
const podcastRoute = require("./src/routes/podcast.route")

//? app configuration
const app = express()
app.use(cors())
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "/public")))

//? database configuration
const uri = process.env.DB_URI
const databaseConfig = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

//? database connection
mongoose.set("strictQuery", true)
mongoose.connect(uri, databaseConfig)
    .then(() => console.log("database connected"))
    .catch((error) => console.log(error))

//? handle routes
app.use("/api/v1", defaultRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/upload", uploadRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/summery", summeryRoute)
app.use("/api/v1/podcast", podcastRoute)

//? handle undefined routes
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route was not found!"
    })
})

//? handle error
app.use(handleError)

module.exports = app