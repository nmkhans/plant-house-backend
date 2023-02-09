const Product = require("../models/product.model")

module.exports.createProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Product.create(data)
        
        res.status(201).json({
            success: true,
            message: "Product created",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.getAllProduct = async (req, res, next) => {
    try {
        const result = await Product.find()

        res.status(200).json({
            success: true,
            message: "All product data.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}