const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res, next) => {
    try {
        const data = req.body;
        const userExist = await User.findOne(
            { email: data.email },
            { _id: 0, email: 1 }
        );

        if (!userExist) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const userData = {
                ...data,
                password: hashedPassword
            }
            await User.create(userData);
            const user = await User.findOne(
                { email: data.email },
                { password: 0 }
            );
            const token = jwt.sign(
                { email: user.email },
                process.env.TOKEN_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                success: true,
                message: "User registration successfull.",
                token: token,
                data: user
            })

        } else {
            res.status(500).json({
                success: false,
                message: "User already exist!"
            })
        }

    } catch (error) {
        next(error)
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const data = req.body;
        const existUser = await User.findOne(
            { email: data.email },
            { email: 1, password: 1 }
        );

        if (existUser) {
            const matchPassword = await bcrypt.compare(data.password, existUser.password);

            if (matchPassword) {
                const user = await User.findOne(
                    { email: data.email },
                    { password: 0 }
                );

                const token = jwt.sign(
                    { email: user.email },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "1h" }
                );

                res.status(200).json({
                    success: true,
                    message: "Login successfull.",
                    token: token,
                    data: user
                })

            } else {
                res.status(500).json({
                    success: false,
                    message: "Incorrect password!"
                })
            }

        } else {
            res.status(500).json({
                success: false,
                message: "User not found!"
            })
        }

    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await User.updateOne(
            { _id: id },
            { $set: data },
        )

        res.status(201).json({
            success: true,
            message: "User profile updated.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const { pageno, perpage } = req.query;
        const pageNo = parseInt(pageno)
        const perPage = parseInt(perpage)

        const skipRow = (pageNo - 1) * perPage;

        const users = await User.find({}, { password: 0 }).skip(skipRow).limit(perPage)

        const count = await User.find().count()


        res.status(200).json({
            success: true,
            message: "All User list",
            data: users,
            count: count
        })

    } catch (error) {
        next(error)
    }
}

module.exports.makeSeller = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await User.updateOne(
            { _id: id },
            {
                $set: {
                    seller: true
                }
            },
            { upsert: true }
        )

        res.status(200).json({
            success: true,
            message: "Promoted to seller successfully.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports.makeAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await User.updateOne(
            { _id: id },
            {
                $set: {
                    role: "admin"
                }
            },
            { upsert: true }
        )

        res.status(200).json({
            success: true,
            message: "Promoted to admin successfully.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}