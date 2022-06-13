
const express = require('express');
const OrderController = require('../controllers/OrderController.js');

const router = express.Router();

router.post("/createOrder", OrderController.createOrder);
router.post("/getAllOrders", OrderController.getAllOrders);
router.post("/getOneOrder/:id", OrderController.getOneOrder);

module.exports = router;