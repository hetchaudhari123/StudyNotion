const express = require('express');
const { contactUs } = require('../controllers/ContactUs');
const router = express.Router();
//contact Us
router.post('/contact-us', contactUs);
module.exports = router;