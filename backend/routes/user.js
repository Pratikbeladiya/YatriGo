const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const { isLoggedIn } = require('../middleware/user');

const upload = multer({ dest: os.tmpdir() });

const {
  register,
  login,
  logout,
  googleLogin,
  uploadPicture,
  updateUserDetails,
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google/login').post(googleLogin);
router.route('/upload-picture').post(isLoggedIn, upload.single('picture'), uploadPicture);
router.route('/update-user').put(isLoggedIn, updateUserDetails);
router.route('/logout').get(logout);

module.exports = router;
