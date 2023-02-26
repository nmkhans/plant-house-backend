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
        const { pageno, perpage } = req.query;

        const pageNo = parseInt(pageno);
        const perPage = parseInt(perpage)
        const skipRow = (pageNo - 1) * perPage

        const result = await Product.find().skip(skipRow).limit(perPage)

        const count = await Product.find().count()

        res.status(200).json({
            success: true,
            message: "All product data.",
            count: count,
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.getSingleProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Product.find({ _id: id })

        res.status(200).json({
            success: true,
            message: `Product data for id ${id}`,
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.filterBySearch = async (req, res, next) => {
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
        }

    } catch (error) {
        next(error)
    }
}

module.exports.filterByCategory = async (req, res, next) => {
    try {
        const { pageno, perpage, category } = req.query;
        const pageNo = parseInt(pageno)
        const perPage = parseInt(perpage)
        const skipRow = (pageNo - 1) * perPage

        const products = await Product.find({ category: category }).skip(skipRow).limit(perPage)

        const count = await Product.find({ category: category }).count()

        res.status(200).json({
            success: true,
            message: "All data filtered by category",
            count: count,
            data: products
        })

    } catch (error) {
        next(error)
    }
}

module.exports.restockProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const updatedDoc = {
            $set: {
                stock: amount
            }
        }

        const result = await Product.updateOne({ _id: id }, updatedDoc)

        res.status(200).json({
            success: true,
            message: "Product restocked.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Product.deleteOne({ _id: id })

        res.status(200).json({
            success: true,
            message: "Product deleted.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.getReviews = async (req, res, next) => {
    try {
        const allReviews = [];

        const products = await Product.find();

        products.forEach(product => {
            const reviews = product.reviews;
            reviews.forEach(review => {
                allReviews.push(review)
            })
        })

        res.status(200).json({
            success: true,
            message: "All Review",
            data: allReviews
        })

    } catch (error) {

    }
}

module.exports.getRecomendedProducts = async (req, res, next) => {
    try {
        const recomendedProducts = [];

        const products = await Product.find();
        products.forEach(product => {
            const totalRatings = parseFloat(product.reviews.reduce((prev, value) => {
                return prev + value.rating
            }, 0))

            const totalReview = product.reviews.length;
            const rating = parseFloat((totalRatings / totalReview)) || 0;

            if (rating > 4.5) {
                recomendedProducts.push(product)
            }
        })

        res.status(200).json({
            success: true,
            message: "Recomended products",
            data: recomendedProducts
        })

    } catch (error) {

    }
}