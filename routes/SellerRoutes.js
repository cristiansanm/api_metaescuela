const express = require('express');
const SellerController = require('../controllers/SellerController.js');

const router = express.Router();

router.post("/getAllProducts", SellerController.getProductsForSeller);
router.post("/getSoldProducts", SellerController.getSoldProductsForSeller);

module.exports = router;