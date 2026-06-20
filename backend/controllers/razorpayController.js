const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyIdHere',
  key_secret: process.env.RAZORPAY_SECRET || 'YourSecretHere',
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    let order;
    try {
      order = await razorpay.orders.create(options);
    } catch (apiErr) {
      // If Razorpay API fails due to authentication (placeholder/missing keys), fallback to Sandbox Mock Order
      if (apiErr.statusCode === 401 || !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes('YourKeyId')) {
        console.log('Razorpay Auth failed/missing keys. Falling back to Dev-Sandbox Mock Order.');
        return res.status(200).json({
          success: true,
          order: {
            id: `order_mock_${Math.random().toString(36).substring(2, 15)}`,
            amount: amount * 100,
            currency: 'INR',
            receipt: options.receipt,
            is_mock: true,
          }
        });
      }
      throw apiErr;
    }

    if (!order) {
      return res.status(500).json({ success: false, message: 'Some error occurred while creating order' });
    }
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error('Razorpay Order Creation Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      bookingData
    } = req.body;

    const userData = req.user;

    // Verify signature (Bypass if it is a Dev-Sandbox Mock Order)
    const isMock = razorpayOrderId && razorpayOrderId.startsWith('order_mock_') && process.env.NODE_ENV !== 'production';
    if (!isMock) {
      const secret = process.env.RAZORPAY_SECRET || 'YourSecretHere';
      const shasum = crypto.createHmac('sha256', secret);
      shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const digest = shasum.digest('hex');

      if (digest !== razorpaySignature) {
        return res.status(400).json({ success: false, message: 'Transaction not legit!' });
      }
    }

    let booking;
    
    // Signature verified, create the booking based on type
    if (bookingData.type === 'car') {
      const CarBooking = require('../models/CarBooking');
      booking = await CarBooking.create({
        user: userData._id,
        car: bookingData.car,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        name: bookingData.name,
        phone: bookingData.phone,
        price: bookingData.price,
        paymentStatus: 'Success',
        razorpayPaymentId,
        razorpayOrderId,
      });
    } else {
      booking = await Booking.create({
        user: userData._id,
        place: bookingData.place,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        numOfGuests: bookingData.noOfGuests,
        name: bookingData.name,
        phone: bookingData.phone,
        price: bookingData.price,
        paymentStatus: 'Success',
        razorpayPaymentId,
        razorpayOrderId,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and booking created successfully',
      booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
