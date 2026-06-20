const Place = require('../models/Place');

// Adds a place in the DB
exports.addPlace = async (req, res) => {
  try {
    const userData = req.user;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;
    const place = await Place.create({
      owner: userData._id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    });
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Returns user specific places
exports.userPlaces = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData._id;
    res.status(200).json(await Place.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Updates a place
exports.updatePlace = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData._id.toString();
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({
        message: 'Place not found',
      });
    }

    if (userId === place.owner.toString()) {
      place.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        maxGuests,
        price,
      });
      await place.save();
      res.status(200).json({
        message: 'place updated!',
      });
    } else {
      res.status(403).json({
        message: 'Unauthorized to update this place',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Returns all the places in DB
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Returns single place, based on passed place id
exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({
        message: 'Place not found',
      });
    }
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Search Places in the DB with advanced filters
exports.searchPlaces = async (req, res) => {
  try {
    const { key } = req.params;
    const {
      city,
      category,
      minPrice,
      maxPrice,
      ratings,
      rooms,
      guests
    } = req.query;

    let query = {};

    // General search key (if provided)
    if (key && key !== 'undefined' && key !== '') {
      query.$or = [
        { title: { $regex: key, $options: 'i' } },
        { address: { $regex: key, $options: 'i' } },
        { city: { $regex: key, $options: 'i' } },
        { description: { $regex: key, $options: 'i' } },
      ];
    }

    // Specific filters
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (ratings) {
      query.ratings = { $gte: Number(ratings) };
    }
    if (rooms) {
      query.rooms = { $gte: Number(rooms) };
    }
    if (guests) {
      query.maxGuests = { $gte: Number(guests) };
    }

    const searchMatches = await Place.find(query);
    res.status(200).json(searchMatches);
  } catch (err) {
    console.error('SEARCH PLACES ERROR:', err);
    res.status(500).json({
      message: 'Internal server error during search',
    });
  }
};

// Deletes a place
exports.deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.user;
    const userId = userData.id;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({
        message: 'Place not found',
      });
    }

    if (userId === place.owner.toString()) {
      await Place.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Place deleted!',
      });
    } else {
      res.status(403).json({
        message: 'Unauthorized to delete this place',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};