const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../managers/productManager');


router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const products = getAllProducts(limit);
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = getProductById(pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});


router.post('/', (req, res) => {
    const product = req.body;
    const newProduct = addProduct(product);
    res.status(201).json(newProduct);
});


router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updates = req.body;
    const updatedProduct = updateProduct(pid, updates);
    if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
});


router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const success = deleteProduct(pid);
    if (!success) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).end();
});

module.exports = router;
