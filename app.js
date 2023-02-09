const express = require("express")
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const defaultRoute = require("./src/routes/default.route")

//? app configuration
const app = express()
app.use(cors())
app.use(express.json())

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

//? handle undefined routes
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route was not found!"
    })
})

//? handle error

module.exports = app