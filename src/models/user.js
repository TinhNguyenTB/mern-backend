const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
},
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;