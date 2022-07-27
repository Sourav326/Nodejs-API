const express = require('express');
const { getAllProducts } = require('../controllers/productController');
const router = express.Router();
// const getAllProducts = require('../controllers/productController');


router.route('/products').get(getAllProducts);

module.exports = router;