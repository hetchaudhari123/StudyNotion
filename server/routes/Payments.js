const express = require('express');
const { capturePayments, verifySignature } = require('../controllers/Payments');
const { isStudent, auth } = require('../middlewares/auth');
const router = express.Router();
// capturePayments
router.post('/capture-payments',auth,capturePayments);
// verifySignature
router.post('/verify-payment',auth,verifySignature);
module.exports = router;