const jwt = require('jsonwebtoken');
require("dotenv").config()

async function authToken(req, res, next) {
    try {
        const token = req.cookies["token"];
        if (!token) {
            return res.status(401).json({
                message: "Token is invalid",
                error: true,
                success: false
            })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req.user = decoded
        next();

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
            data: [],
            error: true,
            success: false
        })
    }
}


module.exports = authToken;