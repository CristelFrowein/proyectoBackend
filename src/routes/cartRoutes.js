const express = require('express');
const router = express.Router();
const { getAllCarts, getCartById, addProductToCart, createCart } = require('../managers/cartManager');


router.get('/', (req, res) => {
    const carts = getAllCarts();
    res.json(carts);
});


router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = getCartById(cid);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart.products);
});


router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;
    const updatedProducts = addProductToCart(cid, pid, quantity);
    if (!updatedProducts) {
        return res.status(404).json({ error: 'Cart or product not found' });
    }
    res.json(updatedProducts);
});


router.post('/', (req, res) => {
    const newCart = createCart();
    res.status(201).json(newCart);
});

module.exports = router;
