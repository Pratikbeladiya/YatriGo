const CarBooking = require('../models/CarBooking');

// Books a car
exports.createCarBooking = async (req, res) => {
  try {
    const userData = req.user;
    const { car, checkIn, checkOut, name, phone, price } = req.body;

    const booking = await CarBooking.create({
      user: userData._id,
      car,
      checkIn,
      checkOut,
      name,
      phone,
      price,
    });

    res.status(200).json({
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// Returns user specific bookings
exports.getCarBookings = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const booking = await CarBooking.find({ user: userData._id }).populate('car');

    res.status(200).json({ booking, success: true });
  } catch (err) {

    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
