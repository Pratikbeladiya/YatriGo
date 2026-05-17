const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  seatingCapacity: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  city: { type: String, required: false },
  state: { type: String, required: false },
  description: { type: String, required: true },
  features: [{ type: String }],
  photos: [{ type: String }],
  hostName: { type: String, required: true },
  hostContact: { type: String, required: true },
  hostEmail: { type: String, required: false, default: '' },
  availabilityStatus: { type: Boolean, default: true },
  pickupAvailability: { type: Boolean, default: true },
  insuranceIncluded: { type: Boolean, default: false },
  ratings: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  isDemo: { type: Boolean, default: false },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
