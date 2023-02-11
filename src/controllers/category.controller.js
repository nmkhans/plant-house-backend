const Category = require("../models/category.model")

module.exports.createCategories = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Category.create(data)
        
        res.status(201).json({
            success: true,
            message: "Category created.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}