"use strict";

var express = require('express');

var router = express.Router();

var cartController = require('../controllers/cartController');

router["delete"]('/:cid/products/:pid', cartController.removeProductFromCart);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.addProductToCart);
router["delete"]('/:cid', cartController.clearCart);
router.get('/:cid', cartController.getCartById);
router.post('/', cartController.createCart);
module.exports = router;