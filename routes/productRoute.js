const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();


router.route('/products').get(isAuthenticatedUser, getAllProducts);
router.route('/product/create').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(productDetails);

module.exports = router;