const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data)
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

            res.status(200).json({
                success: true,
                message: "User registration successfull.",
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