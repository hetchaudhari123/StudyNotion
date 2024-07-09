const express = require('express');
const { contactUs } = require('../controllers/ContactUs');
const router = express.Router();
//contact Us
router.post('contactus', contactUs);
module.exports = router;