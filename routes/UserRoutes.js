const express = require('express');
const UserController = require('../controllers/UserController.js');

const router = express.Router();

router.post("/registerUser", UserController.registerUser);
router.post("/loginUser", UserController.loginUser);
router.put("/editUser", UserController.editUser);
router.put("/convertToSeller", UserController.convertToSeller);
router.put("/deletPhoto", UserController.deleteProfilePhoto);
router.post("/getMiniInfo", UserController.getMiniInfo);

module.exports = router;