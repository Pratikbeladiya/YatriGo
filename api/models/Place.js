const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: [{ type: String }],
  description: {
    type: String,
  },
  perks: [{ type: String }],
  extraInfo: {
    type: String,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: ['Hotel', 'Resort', 'Villa', 'Apartment', 'Homestay', 'Luxury Stay'],
    default: 'Hotel',
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  rooms: {
    type: Number,
    default: 1,
  },
  isDemo: {
    type: Boolean,
    default: false,
  },
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
