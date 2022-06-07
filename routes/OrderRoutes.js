
const express = require('express');
const OrderController = require('../controllers/OrderController.js');

const router = express.Router();

router.post("/create", OrderController.createOrder);
router.post("/getAll", OrderController.getAllOrders);
router.get("/getOneOrder/:id", OrderController.getOneOrder);

module.exports = router;