// const express = require('express');
// const { signUp, login, sendOTP, changePassword } = require('../controllers/Auth');
// const { auth } = require('../middlewares/auth');
// const { updateProfile, deleteAccount, getAllUserDetails } = require('../controllers/Profile');
// const { contactUs } = require('../controllers/ContactUs');
// const {
//     resetPasswordToken,
//     resetPassword,
// } = require("../controllers/ResetPassword");
// const router = express.Router();
// //sign up 
// router.post('/signup', signUp);
// //log in
// router.post('/login', login);
// //sendOTP
// router.post('/sendotp', sendOTP);
// //changePassword
// router.post('/change-password', auth, changePassword);
// // Route for generating a reset password token
// router.post("/reset-password-token", resetPasswordToken)

// // Route for resetting user's password after verification
// router.post("/reset-password", resetPassword)

// module.exports = router;


const express = require('express');
const { signUp, login, sendOTP, changePassword } = require('../controllers/Auth');
const { auth } = require('../middlewares/auth');
const { updateProfile, deleteAccount, getAllUserDetails } = require('../controllers/Profile');
const { contactUs } = require('../controllers/ContactUs');
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");
const router = express.Router();
//sign up 
router.post('/signup', signUp);
//log in
router.post('/login', login);
//sendOTP
router.post('/sendotp', sendOTP);
//changePassword
router.post('/change-password', auth, changePassword);
// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

module.exports = router;