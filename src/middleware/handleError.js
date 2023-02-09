const handleError = (error, req, res, next) => {
    console.log(error)
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: error.message
    })
}

module.exports = handleError