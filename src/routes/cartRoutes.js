const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');  

router.delete('/:cid/products/:pid', cartController.removeProductFromCart);  
router.put('/:cid', cartController.updateCart);  
router.put('/:cid/products/:pid', cartController.addProductToCart);  
router.delete('/:cid', cartController.clearCart);  
router.get('/:cid', cartController.getCartById);  
router.post('/', cartController.createCart);  

module.exports = router;
