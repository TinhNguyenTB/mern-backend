const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config()

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error(`Please provide email`);
        }
        if (!password) {
            throw new Error(`Please provide password`);
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User not found`);
        }
        else {
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (checkPassword) {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    role: user.role
                }
                const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: 60 * 60 });

                const tokenOption = {
                    httpOnly: true,
                    secure: true
                }
                res.cookie("token", token, tokenOption).json({
                    message: "Login success!",
                    data: token,
                    error: false,
                    success: true
                })
            }
            else {
                throw new Error(`Email or password is incorrect`);
            }
        }

    } catch (err) {
        console.log(err)
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController;