const express = require("express");
const router = express.Router();

const userSignUpController = require('../controllers/userSignUp');
const userLoginController = require('../controllers/userLogin');
const userAccountController = require('../controllers/userAccount');
const authToken = require("../middleware/authToken");

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);
router.get('/account', authToken, userAccountController);

module.exports = router;