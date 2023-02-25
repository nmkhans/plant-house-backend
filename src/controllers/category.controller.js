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

module.exports.getCategories = async (req, res, next) => {
    try {
        const result = await Category.find()

        res.status(200).json({
            success: true,
            message: "All categories.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Category.deleteOne({ _id: id })

        res.status(200).json({
            success: true,
            message: "Category deleted!",
            data: result
        })

    } catch (error) {
        next(error)
    }
}