const User = require("../models/user");

async function userAccountController(req, res) {
    try {
        const user = await User.findById(req?.user?._id);
        dataUser = user.toObject();
        delete dataUser.password;

        res.status(200).json({
            message: "Get user's account success",
            data: dataUser,
            error: false,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            data: [],
            error: true,
            success: false
        })
    }
}


module.exports = userAccountController;