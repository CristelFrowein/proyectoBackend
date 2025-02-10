const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');

function readProducts() {
    if (!fs.existsSync(productsFile)) {
        return [];
    }
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data);
}

function writeProducts(products) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

function getAllProducts(limit) {
    const products = readProducts();
    return products.slice(0, limit);
}

function getProductById(pid) {
    const products = readProducts();
    return products.find(p => p.id === pid);
}

function addProduct(product) {
    const products = readProducts();
    const id = Date.now().toString();
    const newProduct = { id, ...product };
    products.push(newProduct);
    writeProducts(products);
    return newProduct;
}

function updateProduct(pid, updates) {
    const products = readProducts();
    const product = products.find(p => p.id === pid);
    if (!product) return null;
    
    Object.assign(product, updates);
    writeProducts(products);
    return product;
}

function deleteProduct(pid) {
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex === -1) return null;

    products.splice(productIndex, 1);
    writeProducts(products);
    return true;
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
