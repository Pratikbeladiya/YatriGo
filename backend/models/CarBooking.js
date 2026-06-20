const mongoose = require("mongoose");

const carBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: mongoose.Schema.ObjectId,
    ref: "Car",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: 'Pending',
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpayOrderId: {
    type: String,
  },
});

const CarBooking = mongoose.model("CarBooking", carBookingSchema);

module.exports = CarBooking;
