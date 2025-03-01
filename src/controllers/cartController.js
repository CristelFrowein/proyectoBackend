const express = require('express');
const router = express.Router();
const cartManager = require('../managers/cartManager');


const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartManager.removeProductFromCart(cid, pid);
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const cart = await cartManager.updateCart(cid, products);
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartManager.addProductToCart(cid, pid, quantity);
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const clearCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.clearCart(cid);
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const getCartById = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(cid);
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


router.get('/cart', async (req, res) => {
    const { cid } = req.query; 
    try {
        const cart = await cartManager.getCartById(cid);
        res.render('cart', { cart: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


router.delete('/:cid/products/:pid', removeProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', addProductToCart);
router.delete('/:cid', clearCart);
router.get('/:cid', getCartById);
router.post('/', createCart);

module.exports = router;
