const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/user');

const {
  addPlace,
  getPlaces,
  updatePlace,
  singlePlace,
  userPlaces,
  searchPlaces,
  deletePlace
} = require('../controllers/placeController');

router.route('/').get(getPlaces);

// Protected routes (user must be logged in)
router.route('/add-places').post(isLoggedIn, addPlace);
router.route('/user-places').get(isLoggedIn, userPlaces);
router.route('/update-place').put(isLoggedIn, updatePlace);

// Not Protected routes but sequence should not be interfered with
router.route('/search/:key').get(searchPlaces);
router.route('/:id').get(singlePlace).delete(isLoggedIn, deletePlace);


module.exports = router;
