const express = require('express');
const router = express.Router();
const razorpayController = require('../controllers/razorpayController');
const { isLoggedIn } = require('../middlewares/user');

router.post('/order', isLoggedIn, razorpayController.createOrder);
router.post('/verify', isLoggedIn, razorpayController.verifyPayment);

module.exports = router;
