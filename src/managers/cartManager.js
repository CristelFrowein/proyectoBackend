const mongoose = require('mongoose');
const Cart = require('./models/Cart');  
const Product = require('./models/Product'); 


async function getAllCarts() {
    try {
        return await Cart.find().populate('products.productId');
    } catch (error) {
        throw new Error('Error fetching carts: ' + error.message);
    }
}


async function getCartById(cid) {
    try {
        return await Cart.findById(cid).populate('products.productId');
    } catch (error) {
        throw new Error('Error fetching cart by ID: ' + error.message);
    }
}


async function createCart() {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        return newCart;
    } catch (error) {
        throw new Error('Error creating cart: ' + error.message);
    }
}


async function addProductToCart(cid, pid, quantity) {
    try {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Cart not found');

        const product = await Product.findById(pid);
        if (!product) throw new Error('Product not found');

       
        const existingProduct = cart.products.find(p => p.productId.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity; 
        } else {
            
            cart.products.push({ productId: pid, quantity });
        }

        await cart.save();
        return cart; 
    } catch (error) {
        throw new Error('Error adding product to cart: ' + error.message);
    }
}


async function removeProductFromCart(cid, pid) {
    try {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Cart not found');

        
        cart.products = cart.products.filter(product => product.productId.toString() !== pid);
        await cart.save();
        return cart; 
    } catch (error) {
        throw new Error('Error removing product from cart: ' + error.message);
    }
}


async function updateCart(cid, products) {
    try {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Cart not found');

       
        for (const product of products) {
            if (!product.productId || typeof product.quantity !== 'number') {
                throw new Error('Invalid product format');
            }
            const productInCart = await Product.findById(product.productId);
            if (!productInCart) throw new Error('Product not found');
        }

        
        cart.products = products;
        await cart.save();
        return cart; 
    } catch (error) {
        throw new Error('Error updating cart: ' + error.message);
    }
}


async function clearCart(cid) {
    try {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Cart not found');

        cart.products = []; 
        await cart.save();
        return cart; 
    } catch (error) {
        throw new Error('Error clearing cart: ' + error.message);
    }
}

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    clearCart
};
