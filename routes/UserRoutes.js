const express = require('express');
const UserController = require('../controllers/UserController.js');

const router = express.Router();

router.post("/registerUser", UserController.registerUser);
router.post("/loginUser", UserController.loginUser);
router.put("/editUser", UserController.editUser);
router.post("/convertToSeller", UserController.convertToSeller);
router.post("/getMiniInfo", UserController.getMiniInfo);
router.post("/addProfilePhoto", UserController.addProfilePhoto);
router.post("/deleteProfilePhoto", UserController.deleteProfilePhoto);
router.post("/getOneUser", UserController.getOneUser);
module.exports = router;