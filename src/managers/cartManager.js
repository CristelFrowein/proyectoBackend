const fs = require('fs');
const path = require('path');

const cartsFile = path.join(__dirname, '../data/cart.json');
const productsFile = path.join(__dirname, '../data/products.json');

function readCarts() {
    if (!fs.existsSync(cartsFile)) {
        return [];
    }
    const data = fs.readFileSync(cartsFile, 'utf-8');
    return JSON.parse(data);
}

function writeCarts(carts) {
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
}

function getAllCarts() {
    return readCarts();
}

function getCartById(cid) {
    const carts = readCarts();
    return carts.find(c => c.id === cid);
}

function addProductToCart(cid, pid, quantity) {
    const carts = readCarts();
    const cart = carts.find(c => c.id === cid);
    if (!cart) return null;

    const products = readProducts();
    const product = products.find(p => p.id === pid);
    if (!product) return null;

    const cartProduct = cart.products.find(p => p.product === pid);
    if (cartProduct) {
        cartProduct.quantity += quantity;
    } else {
        cart.products.push({ product: pid, quantity });
    }

    writeCarts(carts);
    return cart.products;
}

function createCart() {
    const carts = readCarts();
    const id = Date.now().toString();
    const newCart = { id, products: [] };
    carts.push(newCart);
    writeCarts(carts);
    return newCart;
}

module.exports = {
    getAllCarts,
    getCartById,
    addProductToCart,
    createCart
};
