const express = require('express');
const router = express.Router();
const { getAllProduct, getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../managers/productManager');
const { getAllProductsController } = require('../controllers/productController');

const express = require('express');
const router = express.Router();


const { getAllProductsController, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');


router.get('/', getAllProductsController);

router.get('/:pid', getProductById);


router.post('/', addProduct);


router.put('/:pid', updateProduct);


router.delete('/:pid', deleteProduct);


module.exports = router;
