const express = require('express');
const { capturePayments, verifySignature } = require('../controllers/Payments');
const { isStudent, auth } = require('../middlewares/auth');
const router = express.Router();
// capturePayments
router.post('/capture-payments',auth,isStudent,capturePayments);
// verifySignature
router.post('/verify-signature',verifySignature);
module.exports = router;