const express = require("express")
require("dotenv").config()
const cors = require("cors")
const defaultRoute = require("./src/routes/default.route")

//? app configuration
const app = express()
app.use(cors())
app.use(express.json())

//? database configuration

//? handle routes
app.use("/api/v1", defaultRoute)

//? handle undefined routes
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route was not found!"
    })
})

//? handle error

module.exports = app