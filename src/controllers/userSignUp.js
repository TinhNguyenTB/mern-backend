const User = require("../models/user");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function checkRequiredFields(fields, body) {
    for (const field of fields) {
        if (!body[field]) {
            throw new Error(`Please provide ${field}`);
        }
    }
}

async function userSignUpController(req, res) {
    try {
        const { email, name, password } = req.body;
        checkRequiredFields(['email', 'name', 'password'], req.body);

        const user = await User.findOne({ email });
        if (user) {
            throw new Error(`User already exists`);
        }

        var hashPassword = await bcrypt.hashSync(password, salt);
        if (!hashPassword) {
            throw new Error(`Something is wrong`);
        }

        const payload = {
            ...req.body,
            password: hashPassword
        }

        const userData = new User(payload);
        const saveUser = userData.save();

        res.status(201).json({
            data: saveUser,
            error: false,
            success: true,
            message: "User created successfully!"
        })

    } catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController;