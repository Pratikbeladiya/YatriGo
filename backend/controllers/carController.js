const Car = require('../models/Car');

// Adds a car in the DB
exports.addCar = async (req, res) => {
  try {
    const userData = req.user;
    const {
      carName,
      brand,
      model,
      year,
      fuelType,
      transmission,
      seatingCapacity,
      price,
      location,
      description,
      features,
      addedPhotos,
      hostName,
      hostContact,
      hostEmail,
      pickupAvailability,
      insuranceIncluded,
    } = req.body;
    
    const car = await Car.create({
      owner: userData._id,
      carName,
      brand,
      model,
      year: Number(year),
      fuelType,
      transmission,
      seatingCapacity: Number(seatingCapacity),
      price: Number(price),
      location,
      description,
      features: features || [],
      photos: addedPhotos || [],
      hostName,
      hostContact,
      hostEmail: hostEmail || '',
      pickupAvailability: pickupAvailability !== undefined ? pickupAvailability : true,
      insuranceIncluded: insuranceIncluded !== undefined ? insuranceIncluded : false,
    });
    res.status(200).json({
      car,
    });
  } catch (err) {
    console.error('ADD CAR ERROR:', JSON.stringify(err, null, 2));
    res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

// Returns user specific cars
exports.userCars = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData._id;
    res.status(200).json(await Car.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Updates a car
exports.updateCar = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData._id.toString();
    const {
      id,
      carName,
      brand,
      model,
      year,
      fuelType,
      transmission,
      seatingCapacity,
      price,
      location,
      description,
      features,
      addedPhotos,
      hostName,
      hostContact,
      hostEmail,
      pickupAvailability,
      insuranceIncluded,
      availabilityStatus
    } = req.body;

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    if (userId === car.owner.toString()) {
      car.set({
        carName,
        brand,
        model,
        year,
        fuelType,
        transmission,
        seatingCapacity,
        price,
        location,
        description,
        features,
        photos: addedPhotos,
        hostName,
        hostContact,
        hostEmail,
        pickupAvailability,
        insuranceIncluded,
        availabilityStatus
      });
      await car.save();
      res.status(200).json({
        message: 'Car updated!',
      });
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData._id.toString();
    const { id } = req.params;

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (userId === car.owner.toString()) {
      await Car.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Car deleted!',
      });
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Returns all cars in DB
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({
      cars,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Returns single car
exports.singleCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(400).json({
        message: 'Car not found',
      });
    }
    res.status(200).json({
      car,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Search Cars in the DB with advanced filters
exports.searchCars = async (req, res) => {
  try {
    const { key } = req.params;
    const {
      city,
      fuelType,
      transmission,
      brand,
      minPrice,
      maxPrice,
      ratings,
      seatingCapacity
    } = req.query;

    let query = {};

    // General search key (if provided)
    if (key && key !== 'undefined' && key !== '') {
      query.$or = [
        { carName: { $regex: key, $options: 'i' } },
        { brand: { $regex: key, $options: 'i' } },
        { location: { $regex: key, $options: 'i' } },
        { city: { $regex: key, $options: 'i' } },
        { description: { $regex: key, $options: 'i' } },
      ];
    }

    // Specific filters
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }
    if (fuelType && fuelType !== 'All') {
      query.fuelType = fuelType;
    }
    if (transmission && transmission !== 'All') {
      query.transmission = transmission;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (ratings) {
      query.ratings = { $gte: Number(ratings) };
    }
    if (seatingCapacity) {
      query.seatingCapacity = { $gte: Number(seatingCapacity) };
    }

    const searchMatches = await Car.find(query);
    res.status(200).json(searchMatches);
  } catch (err) {
    console.error('SEARCH CARS ERROR:', err);
    res.status(500).json({
      message: 'Internal server error during search',
    });
  }
};
