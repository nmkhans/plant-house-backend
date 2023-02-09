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