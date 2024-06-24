const express = require("express");
const router = express.Router();

const userSignUpController = require('../controllers/userSignUp');
const userLoginController = require('../controllers/userLogin');

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);

module.exports = router;