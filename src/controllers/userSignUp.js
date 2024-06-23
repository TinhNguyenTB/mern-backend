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
            throw new Error(`Email ${email} already exists`);
        }

        const hashPassword = await bcrypt.hashSync(password, salt);
        if (!hashPassword) {
            throw new Error(`Something is wrong`);
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new User(payload);
        const saveUser = await userData.save();

        const userResponse = saveUser.toObject(); // Convert to plain JavaScript object
        delete userResponse.password; // Remove the password field

        res.status(201).json({
            data: userResponse,
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