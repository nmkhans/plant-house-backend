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

module.exports.filteredProduct = async (req, res, next) => {
    try {
        const { pageno, perpage, search } = req.query;
        const pageNo = parseInt(pageno);
        const perPage = parseInt(perpage)
        const skipRow = (pageNo - 1) * perPage;
        const searchRegx = { $regex: search, $options: "i" }

        if (search) {
            const searchQuery = {
                $or: [
                    { name: searchRegx },
                    { category: searchRegx }
                ]
            }

            const products = await Product.find(searchQuery).skip(skipRow).limit(perPage)
            const count = await Product.find(searchQuery).count()

            res.status(200).json({
                success: true,
                message: "Product filtered data.",
                count: count,
                data: products
            })
        } else {
            const products = await Product.find({}).skip(skipRow).limit(perPage)
            const count = await Product.find().count()

            res.status(200).json({
                success: true,
                message: "Product filtered data.",
                count: count,
                data: products
            })
        }

    } catch (error) {
        next(error)
    }
}