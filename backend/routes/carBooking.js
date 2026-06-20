const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/user');
const {
  createCarBooking,
  getCarBookings,
} = require('../controllers/carBookingController');

router.route('/').post(isLoggedIn, createCarBooking).get(isLoggedIn, getCarBookings);

module.exports = router;
