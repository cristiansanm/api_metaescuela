const express = require('express');
const ProductController = require('../controllers/ProductController.js');

const router = express.Router();

router.post("/getAll", ProductController.getAllProducts);
router.post("/getByFilter", ProductController.getByFilter);
router.get("/getOneProduct/:id", ProductController.getOneProduct);
router.post("/createProduct", ProductController.createProduct);
router.post("/editProduct", ProductController.editProduct);

module.exports = router;