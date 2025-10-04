

const express = require('express');
const { signUp, login, changePassword } = require('../controllers/Auth');
const { auth } = require('../middlewares/auth');

const router = express.Router();
//sign up 
router.post('/signup', signUp);
//log in
router.post('/login', login);

//changePassword
router.post('/change-password', auth, changePassword);

module.exports = router;