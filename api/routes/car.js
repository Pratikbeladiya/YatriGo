const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');
const {
  addCar,
  getCars,
  userCars,
  updateCar,
  singleCar,
  searchCars,
  deleteCar,
} = require('../controllers/carController');

router.route('/').post(isLoggedIn, addCar).get(getCars);
router.route('/user-cars').get(isLoggedIn, userCars);
router.route('/update-car').put(isLoggedIn, updateCar);
router.route('/search/:key').get(searchCars);
router.route('/:id').get(singleCar).delete(isLoggedIn, deleteCar);

module.exports = router;
