const Razorpay = require('razorpay');
require('dotenv').config();
exports.instance = new Razorpay({ 
    key_id: process.env.RAZORPAY_KEY, 
    // key_id: "rzp_test_mjgfS4aI7n3uqt", 
    key_secret: process.env.RAZORPAY_SECRET 
    // key_secret: "lYS9jXe1OJryXgrM6y8la7kZ"
})