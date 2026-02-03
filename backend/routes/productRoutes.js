const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productValidator } = require('../middleware/validator');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productValidator, productController.createProduct);
router.put('/:id', productValidator, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
